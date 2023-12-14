import userDataModel from "../models/userData.model";
import type { Request, Response, CookieOptions } from "express";

export const exportUserData = async (
  req: Request<
    any,
    any,
    { cookies: CookieOptions[]; localStorageData: string[]; recepients: string[] }
  >,
  res: Response
) => {
  try {
    console.log(req.body)
    // const { cookies, localStorageData, recepients } = req.body;
    // const { _id } = req.user;
    
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while exporting data", stack: error });
  }
};
