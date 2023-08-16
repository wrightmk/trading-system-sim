import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";

import authRouter from "./routes/auth";
import userRouter from "./routes/users";
import transactionRouter from "./routes/transactions";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/transactions", transactionRouter);

export default app;
