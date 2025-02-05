import { object, string } from "zod";

export const recipeValidator = object({
  name: string({ required_error: "Your recipe must have a name" }),
  description: string({
    required_error: "Your recipe must have a description",
  }),
});
