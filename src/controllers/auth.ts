import e, { RequestHandler, request } from "express";
import { prisma } from "../services/prisma";
import { hashPassword, isValidPassword } from "../helpers/bcrypt";
import { createToken } from "../helpers/jwt";
import { authenticateUser } from "../services/auth";
import { registerUserValidator } from "../validators/register-user";
import { loginUserValidator } from "../validators/login-user";

export const registerUser: RequestHandler = async (req, res) => {
  const data = registerUserValidator.parse(req.body);

  const userEmailExists = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (userEmailExists) {
    res
      .status(400)
      .json({ message: "There is already an user with that email" });
    return;
  }

  const usernameExists = await prisma.user.findUnique({
    where: { username: data.username },
  });
  if (usernameExists) {
    res
      .status(400)
      .json({ message: "There is already a user with that username" });
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
  const { email, username, id } = await authenticateUser(req);
  res.status(200).json({ email, username, id });
};

export const updateUsername: RequestHandler = async (req, res) => {
  try {
    const { id } = await authenticateUser(req);
    const { username } = req.body;

    if (!username || typeof username !== "string") {
      res.status(400).json({ message: "Username is required" });
      return;
    }

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });
    if (usernameExists) {
      res.status(400).json({ message: "Username already exists" });
      return;
    }

    if (username.length < 3) {
      res
        .status(400)
        .json({ message: "Username must have 3 characters at least" });
      return;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username },
      select: { id: true, email: true, username: true },
    });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
