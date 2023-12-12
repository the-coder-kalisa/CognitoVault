import { Document } from "mongoose";
import { CookieOptions } from "express";

export interface IUserData extends Document {
  user_id: string;
  cookies: CookieOptions[];
  localStorage: string[];
  users: string[];
}
