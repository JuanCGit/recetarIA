import { Router } from "express";
import { createRecipe, getRecipes } from "../controllers/recipes";

const router = Router();
router.post("/", createRecipe);
router.get("/", getRecipes);

export const recipesRouter = router;
