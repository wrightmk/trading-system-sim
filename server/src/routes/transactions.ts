import express from "express";
import { createTransaction } from "../controllers/transactions";
import { authenticateJWT } from "../middleware/authenticateJWT";

const router = express.Router();

router.post("/", authenticateJWT, createTransaction);

export default router;
