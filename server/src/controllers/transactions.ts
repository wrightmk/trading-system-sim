import { Request, Response } from "express";
import knex from "../utils/db";

export const createTransaction = async (req: Request, res: Response) => {
  const { senderId, receiverId, amount }: TransactionRequestBody = req.body;
  if (amount <= 0) {
    res
      .status(400)
      .json({ message: "Transaction amount must be greater than zero." });
    return;
  }

  const [user]: User[] = await knex("users")
    .select("id", "username", "balance")
    .where({ id: receiverId });

  if (!user) {
    res
      .status(404)
      .json({ message: "The User you're sending to does not exist" });
    return;
  }

  try {
    const { balance: senderBalance }: { balance: number } = await knex("users")
      .where("id", senderId)
      .select("balance")
      .first();

    if (senderBalance < amount) {
      res
        .status(400)
        .json({ message: "Insufficient balance for the transaction." });
      return;
    }

    await knex.transaction(async (trx) => {
      await trx("users").where("id", senderId).decrement("balance", amount);
      await trx("users").where("id", receiverId).increment("balance", amount);

      const [transactionId]: number[] = await trx("transactions")
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          amount: amount,
        })
        .returning("id");

      res.status(201).json({
        transactionId: transactionId,
        senderId,
        receiverId,
        amount,
      });
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error processing transaction", error: error.message });
  }
};
