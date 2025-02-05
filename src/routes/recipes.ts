import { Router } from "express";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipes";

const router = Router();
router.get("/", getRecipes);
router.post("/", createRecipe);
router.get("/:recipeId", getRecipe);
router.put("/:recipeId", updateRecipe);
router.delete("/:recipeId", deleteRecipe);

export const recipesRouter = router;
