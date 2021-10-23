import authConfig from "@config/auth";
import AppError from "@shared/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuth(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("JWT Token is missing");

  const [, token] = authHeader.split(" ");

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT Token");
  }
}
