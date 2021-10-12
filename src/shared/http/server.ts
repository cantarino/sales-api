import "@shared/typeorm";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import AppError from "../errors/app-error";
import routes from "./routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
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
  }
);
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});