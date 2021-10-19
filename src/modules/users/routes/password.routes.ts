import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { ForgotPasswordController } from "../controllers/forgot-password-controller";

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const bodyValidator = {
  email: Joi.string().email().required(),
};

passwordsRouter.post(
  "/forgot",
  celebrate({ body: bodyValidator }),
  forgotPasswordController.create
);

export default passwordsRouter;
