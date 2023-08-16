import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import knex from "../utils/db";
import app from "../app";

describe("Users Controller", () => {
  afterEach(async () => {
    await knex("users").del();
  });

  describe("POST /users", () => {
    it("should create a new user and return 201 status", async () => {
      const response = await request(app).post("/users").send({
        username: "testuser",
        password: "testpassword",
      });

      const { token } = response.body;
      const decodedToken = jwt.decode(token) as JWTData;

      expect(response.status).toBe(201);
      expect(decodedToken.username).toBe("testuser");
      expect(decodedToken).toHaveProperty("userId");
    });
  });

  describe("GET /users/:id", () => {
    it("should retrieve details of a user", async () => {
      const hashedPassword = await bcrypt.hash("testpassword", 10);
      const [user] = await knex("users")
        .insert({
          username: "testuser",
          password_hash: hashedPassword,
        })
        .returning("id");

      const response = await request(app).get(`/users/${user.id}`);

      expect(response.status).toBe(200);
      expect(response.body.username).toBe("testuser");
      expect(response.body.id).toBe(user.id);
      expect(response.body).toHaveProperty("balance");
    });

    it("should return 404 if user is not found", async () => {
      const response = await request(app).get("/users/9999"); // Assuming 9999 is a non-existent user ID

      expect(response.status).toBe(404);
    });
  });
});
