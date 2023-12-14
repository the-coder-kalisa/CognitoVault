import { searchUsers } from "../controllers/user.controller";
import { Router } from "express";

const router = Router();

router.get("/search", searchUsers as any);

export default router;
