import AppError from "@shared/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { getTokenPayload } from "../../../jsonwebtoken/jwt";

export default function isAuth(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError("JWT Token is missing");

  const [, token] = authHeader.split(" ");

  const { sub } = getTokenPayload(token);
  if (!sub) throw new AppError("Invalid JWT Token");

  request.user = {
    id: sub,
  };

  return next();
}
