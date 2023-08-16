import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import knex from "../utils/db";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../utils/auth";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password }: UserRequestBody = req.body;

    const existingUser = await knex("users")
      .where("username", username)
      .first();
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user]: User[] = await knex("users")
      .insert({
        username: username,
        password_hash: hashedPassword,
      })
      .returning(["id", "username", "balance"]);

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({ token });
  } catch (error: any) {
    console.log("error", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.id;

    const [user]: User[] = await knex("users")
      .select("id", "username", "balance")
      .where({ id: userId });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};
