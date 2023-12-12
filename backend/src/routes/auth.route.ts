import { login, register, me } from "../controllers/auth.controller";
import { Router } from "express";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", me as any);

export default router;
