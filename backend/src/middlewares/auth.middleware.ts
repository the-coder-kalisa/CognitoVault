import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest, IUser } from "../types/user";
import userModel from "../models/user.model";

export const verifyAuthToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token)
      return res.status(400).json({ message: "Invalid Authentication" });

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      async (err: any, { _id }: any) => {
        if (err)
          return res.status(400).json({ message: "Invalid Authentication" });
        req.user_id = _id;
        next();
      }
    );
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
