import { prisma } from "../services/prisma";
import { authenticateUser } from "../services/auth";
import { recipeValidator } from "../validators/recipe.validator";
import { RequestHandler } from "express";

export const createRecipe: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const validatedData = recipeValidator.parse(req.body);
  const newRecipe = await prisma.recipe.create({
    data: {
      name: validatedData.name,
      description: validatedData.description,
      userId: user.id
    },
  });
  res.status(201).json(newRecipe);
};

export const getRecipes: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const recipes = await prisma.recipe.findMany({
    where: { userId: user.id },
  });
  res.status(200).json(recipes);
};

export const getRecipe: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const recipeId = req.params.recipeId;
  const recipe = await prisma.recipe
    .findUnique({
      where: { id: Number(recipeId) },
    })
    .catch(() => undefined);
  if (!recipe) {
    res.status(404).json({ message: "Recipe not found :(" });
    return;
  }
  const isAuthor = recipe.userId === user.id;
  res.status(200).json({ ...recipe, isAuthor });
};

export const updateRecipe: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const recipeId = req.params.recipeId;
  const data = recipeValidator.parse(req.body);
  const updatedRecipe = await prisma.recipe.update({
    data,
    where: { userId: user.id, id: Number(recipeId) },
  });
  res.status(200).json({ ...updatedRecipe, isAuthor: true });
};

export const deleteRecipe: RequestHandler = async (req, res) => {
  const user = await authenticateUser(req);
  const recipeId = req.params.recipeId;
  await prisma.recipe.delete({
    where: { userId: user.id, id: Number(recipeId) },
  });
  res.status(200).json({ message: "The recipe has been deleted successfully" });
};
