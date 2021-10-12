import "@shared/typeorm";
import { errors } from "celebrate";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import AppError from "../errors/app-error";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
export default app;
