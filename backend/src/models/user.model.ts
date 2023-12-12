import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

const userSChema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your fullname"],
    trim: true,
    minLength: [3, "Your fullname must be at least 3 characters long"],
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
    trim: true,
    unique: true,
    minLength: [3, "Your username must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minLength: [6, "Your password must be at least 6 characters long"],
  },
});

userSChema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

userSChema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSChema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d",
  });
};

userSChema.methods.generateVerificationToken = function () {
  return jwt.sign({ _id: this._id }, process.env.VERIFICATION_TOKEN_SECRET!, {
    expiresIn: "1d",
  });
};

userSChema.methods.generatePasswordResetToken = function () {
  return jwt.sign({ _id: this._id }, process.env.PASSWORD_RESET_TOKEN_SECRET!, {
    expiresIn: "15m",
  });
};

export default mongoose.model<IUser>("User", userSChema);
