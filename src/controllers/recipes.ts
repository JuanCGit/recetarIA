import { prisma } from "../services/prisma";
import { authenticateUser } from "../services/auth";
import { createRecipeValidator } from "../validators/create-recipe.validator";

export async function createRecipe(req, res) {
  const user = await authenticateUser(req);
  const validatedData = createRecipeValidator.parse(req.body);
  const newRecipe = await prisma.recipe.create({
    data: {
      name: validatedData.name,
      description: validatedData.description,
      userId: user.id,
    },
  });
  return res.status(201).json(newRecipe);
}
