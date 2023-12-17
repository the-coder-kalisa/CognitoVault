import mongoose from "mongoose";
import { IUserData } from "../types/userData";

const userDataSchema = new mongoose.Schema(
  {
    url: {
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
      type: Array,
      required: [true, "Please enter your cookies"],
    },
    localStorage: {
      type: Array,
      required: [true, "Please enter your localStorage data"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    recepients: {
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
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUserData>("UserData", userDataSchema);
