import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { ForgotPasswordController } from "../controllers/forgot-password-controller";
import { ResetPasswordController } from "../controllers/reset-password-controller";

const passwordsRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordsRouter.post(
  "/forgot",
  celebrate({ body: { email: Joi.string().email().required() } }),
  forgotPasswordController.create
);

passwordsRouter.post(
  "/reset",
  celebrate({
    body: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  resetPasswordController.create
);

export default passwordsRouter;
