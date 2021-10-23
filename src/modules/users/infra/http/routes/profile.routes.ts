import isAuth from "@shared/infra/http/middlewares/is-auth";
import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { ProfileController } from "../controllers/profile-controller";

const profileRouter = Router();
const profileController = new ProfileController();
const bodyValidator = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  old_password: Joi.string(),
  password: Joi.string().optional(),
  password_confirmation: Joi.string()
    .valid(Joi.ref("password"))
    .when("password", {
      is: Joi.exist(),
      then: Joi.required(),
    }),
};

profileRouter.use(isAuth);

profileRouter.get("/", profileController.show);
profileRouter.put(
  "/",
  celebrate({ body: bodyValidator }),
  profileController.update
);

export default profileRouter;
