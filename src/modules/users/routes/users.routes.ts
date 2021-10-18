import uploadConfig from "@config/upload";
import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import multer from "multer";
import isAuth from "../../../shared/http/middlewares/is-auth";
import { UserAvatarController } from "../controllers/user-avatar-controller";
import { UsersController } from "../controllers/users-controller";

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const bodyValidator = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};
const upload = multer(uploadConfig);

usersRouter.get("/", isAuth, usersController.index);

usersRouter.post(
  "/",
  celebrate({ body: bodyValidator }),
  usersController.create
);

usersRouter.patch(
  "/avatar",
  isAuth,
  upload.single("avatar"),
  usersAvatarController.update
);

export default usersRouter;
