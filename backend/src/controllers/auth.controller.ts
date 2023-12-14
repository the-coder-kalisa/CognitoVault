import userModel from "../models/user.model";
import type { Request, Response } from "express";
import { userRegisterSchema, userLoginSchema } from "../util/validation";
import type { AuthenticatedRequest } from "../types/user";

export const register = async (req: Request, res: Response) => {
  try {
    const { error } = userRegisterSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.message });

    const { fullname, username, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const newUser = new userModel({ fullname, username, email, password });
    await newUser.save();
    let authToken = newUser.generateAuthToken();

    return res
      .status(201)
      .json({ token: authToken, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while registering", stack: error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = userLoginSchema.validate(req.body);

    if (error) return res.status(400).json({ message: error.message });

    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email not found" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    let authToken = user.generateAuthToken();

    return res.status(200).json({ token: authToken, message: "Login success" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error while logging", stack: error });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) return res.status(400).json({ message: "Email not found" });

    let passwordResetToken = user.generatePasswordResetToken();

    return res.status(200).json({
      token: passwordResetToken,
      message: "Password reset token generated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error while generating reset password token",
      stack: error,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { password } = req.body;

    const user = await userModel.findById(req.params.id);

    if (!user) return res.status(400).json({ message: "User not found" });

    user.password = password;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reset successfully", user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while resetting password", stack: error });
  }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await userModel.findById(req.user_id).select('-password');
    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error while getting user data", stack: error });
  }
};
