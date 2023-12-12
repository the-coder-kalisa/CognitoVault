import type { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";

export const verifyAuthToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(400).json({ message: "Invalid Authentication" });

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!,
      (err: any, user: any) => {
        if (err)
          return res.status(400).json({ message: "Invalid Authentication" });

        req.user = user;
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
