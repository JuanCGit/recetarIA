import { Request } from "express";
import { prisma } from "./prisma";
import { AuthError } from "../types/auth-error";
import { validateToken } from "../helpers/jwt";

export async function authenticateUser(request: Request) {
  const token = request.headers.authorization?.split(" ")[1];
  if (!token) throw new AuthError();

  let userId: number;
  try {
    userId = validateToken(token).userId;
  } catch {
    throw new AuthError();
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AuthError();

  return user;
}
