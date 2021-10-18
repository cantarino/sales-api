import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { UsersController } from "../controllers/users-controller";

const usersRouter = Router();
const usersController = new UsersController();
const bodyValidator = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

usersRouter.get("/", usersController.index);

usersRouter.post(
  "/",
  celebrate({ body: bodyValidator }),
  usersController.create
);

export default usersRouter;
