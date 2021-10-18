import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { SessionsController } from "../controllers/sessions-controller";

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const bodyValidator = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

sessionsRouter.post(
  "/",
  celebrate({ body: bodyValidator }),
  sessionsController.create
);

export default sessionsRouter;
