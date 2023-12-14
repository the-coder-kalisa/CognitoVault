import { login, register, me } from "../controllers/auth.controller";
import { Router } from "express";
import { verifyAuthToken } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyAuthToken as any, me as any);

export default router;
