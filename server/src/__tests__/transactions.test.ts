import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import app from "../app";
import knex from "../utils/db";
import { JWT_SECRET } from "../utils/auth";

describe("Transaction Routes", () => {
  let sender: JWTData;
  let receiver: JWTData;
  let token: string;

  beforeAll(async () => {
    const hashedPassword = await bcrypt.hash("testpassword", 10);

    [sender] = await knex("users")
      .insert({
        username: "sender",
        password_hash: hashedPassword,
        balance: 1000,
      })
      .returning(["id", "username"]);

    [receiver] = await knex("users")
      .insert({
        username: "receiver",
        password_hash: hashedPassword,
        balance: 1000,
      })
      .returning(["id", "username"]);

    token = jwt.sign(
      { userId: sender.id, username: sender.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );
  });

  describe("POST /transactions", () => {
    it("should create a transaction and return 201 status", async () => {
      const { id: senderId } = sender;
      const { id: receiverId } = receiver;

      const response = await request(app)
        .post("/transactions")
        .set("Authorization", `Bearer ${token}`)
        .send({
          senderId,
          receiverId,
          amount: 100,
        });

      expect(response.status).toBe(201);
      expect(response.body.senderId).toBe(senderId);
      expect(response.body.receiverId).toBe(receiverId);
      expect(response.body.amount).toBe(100);
    });

    it("should not allow transaction if sender has insufficient balance", async () => {
      const { id: senderId } = sender;
      const { id: receiverId } = receiver;
      const response = await request(app)
        .post("/transactions")
        .set("Authorization", `Bearer ${token}`)
        .send({
          senderId: senderId,
          receiverId: receiverId,
          amount: 1000000,
        });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe(
        "Insufficient balance for the transaction."
      );
    });
  });
});
