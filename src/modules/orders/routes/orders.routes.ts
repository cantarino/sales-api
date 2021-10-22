import isAuth from "@shared/http/middlewares/is-auth";
import { idValidator } from "@shared/http/validation/id-validator";
import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { OrdersController } from "../controllers/orders-controller";

const ordersRouter = Router();
const ordersController = new OrdersController();
const bodyValidator = {
  customer_id: Joi.string().uuid().required(),
  products: Joi.required(),
};

ordersRouter.use(isAuth);

ordersRouter.get(
  "/:id",
  celebrate({ params: idValidator }),
  ordersController.show
);

ordersRouter.post(
  "/",
  celebrate({ body: bodyValidator }),
  ordersController.create
);

export default ordersRouter;
