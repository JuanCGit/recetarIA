import { Router } from "express";
import { generateRecipe } from "../controllers/ai";

const router = Router();

router.post("/recipe", generateRecipe);

export const aiRouter = router;
