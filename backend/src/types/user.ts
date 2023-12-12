import { Document } from "mongoose";
import type {  Request } from "express";

export interface IUser extends Document {
  fullname: string;
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  generateAuthToken(): string;
  generateVerificationToken(): string;
  generatePasswordResetToken(): string;
  comparePassword(password: string): Promise<boolean>;
}


export interface AuthenticatedRequest extends Request {
  user: IUser;
}
