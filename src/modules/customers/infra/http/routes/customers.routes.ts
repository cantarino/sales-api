import isAuth from "@shared/infra/http/middlewares/is-auth";
import { idValidator } from "@shared/infra/http/validation/id-validator";
import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import CustomersController from "../controllers/CustomerController";

const customersRouter = Router();
const customersController = new CustomersController();
const bodyValidator = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
};

customersRouter.use(isAuth);

customersRouter.get("/", customersController.index);
customersRouter.get(
  "/:id",
  celebrate({ params: idValidator }),
  customersController.show
);
customersRouter.post(
  "/",
  celebrate({ body: bodyValidator }),
  customersController.create
);
customersRouter.put(
  "/:id",
  celebrate({ body: bodyValidator, params: idValidator }),
  customersController.update
);
customersRouter.delete(
  "/:id",
  celebrate({ params: idValidator }),
  customersController.delete
);

export default customersRouter;
