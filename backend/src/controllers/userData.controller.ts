import userDataModel from "../models/userData.model";
import type { Request, Response, CookieOptions } from "express";

export const exportUserData = async (
  req: Request<
    any,
    any,
    { cookies: CookieOptions[]; localStorageData: string[] }
  >,
  res: Response
) => {
  try {
    const { cookies, localStorageData } = req.body;
    const { _id } = req.user;
    const userData = await userDataModel.findOne({ user_id: _id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while exporting data", stack: error });
  }
};
