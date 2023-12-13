import mongoose from "mongoose";
import { IUserData } from "../types/userData";
import { CookieOptions } from "express";

const userDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please enter your user_id"],
    trim: true,
    unique: true,
    lowercase: true,
    ref: "User",
  },
  cookies: {
    type: [{ type: CookieOptions }],
    required: [true, "Please enter your cookies"],
  },
  localStorage: {
    type: Array,
    required: [true, "Please enter your localStorage data"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  users: {
    type: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          ref: "User",
          required: true,
        },
        accepted: {
          type: Boolean,
          default: false,
        },
      },
    ],
    required: [true, "Please enter your users data"],
    trim: true,
    unique: true,
    lowercase: true,
  },
});

export default mongoose.model<IUserData>("UserData", userDataSchema);
