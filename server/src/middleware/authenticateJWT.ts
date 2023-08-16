import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/auth";

export const authenticateJWT = (
  req: Request & { user?: JWTData },
  res: Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid auth token",
          error: err.message,
        });
      }

      req.user = user as JWTData;
      next();
    });
  } else {
    res.status(401).json({
      message: "No auth token provided",
    });
  }
};
