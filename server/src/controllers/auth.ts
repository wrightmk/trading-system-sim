import { Request, Response } from "express";
import knex from "../utils/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/auth";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: AuthRequestBody = req.body;

    const [user]: User[] = await knex("users")
      .select("id", "username", "password_hash")
      .where({ username: username });

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};
