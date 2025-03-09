import { object, string } from "zod";

export const recipeValidator = object({
  name: string({ required_error: "Your recipe must have a name" }).min(
    2,
    "The recipe name must have at least 2 characters"
  ),
  description: string({
    required_error: "Your recipe must have a description",
  }).min(10, "The recipe description must have at least 10 characters"),
  summary: string({
    required_error: "Your recipe must have a summary",
  }).min(10, "The recipe summary must have at least 10 characters"),
});
