import userModel from "../models/user.model";
import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../types/user";

export const searchUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search, page, limit } = req.query;
    const users = await userModel.aggregate([
      {
        $match: {
          $or: [
            { username: { $regex: search, $options: "i" } },
            { fullname: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
          $and: [{ _id: { $ne: req.user_id } }],
        },
      },
      {
        $skip: Number(page) * Number(limit) - Number(limit),
      },
      {
        $limit: Number(limit),
      },
      {
        $project: {
          password: 0,
          // createdAt: 0,
          // updatedAt: 0,
          __v: 0,
        },
      },
    ]);
    return res.status(200).json({ users, page, limit });
  } catch (error) {
    return res.status(500).json(error);
  }
};
