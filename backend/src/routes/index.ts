import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import userDataRouter from './userDate.route'

const api = Router();

api.use("/auth", authRouter);
api.use("/users", userRouter);
api.use('/user-data', userDataRouter)

export default api;
