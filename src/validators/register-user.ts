import { object, string } from "zod";

export const registerUserValidator = object({
  username: string({ required_error: "A username is required" }).min(
    3,
    "The username must have at least 3 characters"
  ),
  email: string({ required_error: "An email is required " }).email(
    "It has to be a valid email"
  ),
  password: string({ required_error: "A password is required" }),
});
