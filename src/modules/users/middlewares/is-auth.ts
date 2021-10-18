import authConfig from "@config/auth";
import AppError from "@shared/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export default function isAuth(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("JWT Token is missing");

  const [, token] = authHeader.split(" ");

  try {
    const decodeToken = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new AppError("Invalid JWT Token");
  }
}
