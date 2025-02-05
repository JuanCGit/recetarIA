import { Router } from "express";
import { createRecipe, getRecipes, getRecipe } from "../controllers/recipes";

const router = Router();
router.post("/", createRecipe);
router.get("/", getRecipes);
router.get("/:recipeId", getRecipe);

export const recipesRouter = router;
