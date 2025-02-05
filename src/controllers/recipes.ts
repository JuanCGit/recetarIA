import { prisma } from "../services/prisma";
import { authenticateUser } from "../services/auth";
import { createRecipeValidator } from "../validators/create-recipe.validator";
import { RequestHandler } from "express";

export const createRecipe: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const validatedData = createRecipeValidator.parse(req.body);
  const newRecipe = await prisma.recipe.create({
    data: {
      name: validatedData.name,
      description: validatedData.description,
      userId: user.id,
    },
  });
  res.status(201).json(newRecipe);
};

export const getRecipes: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const recipes = await prisma.recipe.findMany({
    where: { userId: user.id },
  });
  res.status(201).json(recipes);
};

export const getRecipe: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const recipeId = req.params.recipeId;
  const recipes = await prisma.recipe.findUnique({
    where: { userId: user.id, id: Number(recipeId) },
  });
  res.status(201).json(recipes);
};
