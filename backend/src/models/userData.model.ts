import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUserData } from "../types/userData";

const userDataSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please enter your user_id"],
    trim: true,
    unique: true,
    lowercase: true,
    ref: "User",
  },
  cookies: {
    type: Array,
    required: [true, "Please enter your cookies"],
    trim: true,
    unique: true,
    lowercase: true,
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
