import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
  updateUsername,
} from "../controllers/auth";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.put("/update-username", updateUsername);

export const authRouter = router;
