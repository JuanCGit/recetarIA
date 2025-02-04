import e, { RequestHandler, request } from "express";
import { prisma } from "../services/prisma";
import { hashPassword, isValidPassword } from "../helpers/bcrypt";
import { createToken } from "../helpers/jwt";
import { authenticateUser } from "../services/auth";
import { registerUserValidator } from "../validators/register-user";
import { loginUserValidator } from "../validators/login-user";

export const registerUser: RequestHandler = async (req, res) => {
  const data = registerUserValidator.parse(req.body);
  const conflicting = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (conflicting) {
    res
      .status(400)
      .json({ message: "There is already an user with that email" });
    return;
  }

  const createdUser = await prisma.user.create({
    data: { ...data, password: await hashPassword(data.password) },
  });
  res.status(201).json({ token: createToken(createdUser.id) });
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = loginUserValidator.parse(req.body);

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const isPasswordCorrect = await isValidPassword(password, user.password);
  if (!isPasswordCorrect) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  res.json({ token: createToken(user.id) });
};

export const getUser: RequestHandler = async (req, res) => {
  const { email, name, id } = await authenticateUser(req);
  res.status(200).json({ email, name, id });
};
