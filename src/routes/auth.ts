import { Router } from "express";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
} from "../controllers/recipes";

const router = Router();
router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:recipeId", getRecipe);
router.put("/:recipeId", updateRecipe);

export const recipesRouter = router;
