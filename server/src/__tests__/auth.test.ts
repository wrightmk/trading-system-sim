import request from "supertest";
import bcrypt from "bcrypt";
import app from "../app";
import knex from "../utils/db";

describe("Authentication", () => {
  afterEach(async () => {
    await knex("users").del();
  });

  it("should login a user and return a token", async () => {
    const hashedPassword = await bcrypt.hash("testpassword", 10);

    await knex("users").insert({
      username: "testuser1",
      password_hash: hashedPassword,
    });
    const response = await request(app).post("/auth/login").send({
      username: "testuser1",
      password: "testpassword",
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should not login a user with incorrect credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "testuser1",
      password: "wrongpassword",
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Invalid username or password");
  });
});
