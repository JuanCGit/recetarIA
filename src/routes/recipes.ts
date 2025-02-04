import { Router } from "express";
import { createRecipe } from "../controllers/recipes";

const router = Router();
router.post("/", createRecipe);

export const recipesRouter = router;
