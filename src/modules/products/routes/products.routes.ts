import { idValidator } from "@shared/infra/http/validation/id-validator";
import { celebrate, Joi } from "celebrate";
import { Router } from "express";
import { ProductsController } from "../controllers/products-controller";

const productsRouter = Router();
const productsController = new ProductsController();
const bodyValidator = {
  name: Joi.string().required(),
  price: Joi.number().precision(2).required(),
  quantity: Joi.number().required(),
};

productsRouter.get("/", productsController.index);

productsRouter.get(
  "/:id",
  celebrate({
    params: idValidator,
  }),
  productsController.show
);

productsRouter.post(
  "/",
  celebrate({ body: bodyValidator }),
  productsController.create
);

productsRouter.put(
  "/:id",
  celebrate({ body: bodyValidator, params: idValidator }),
  productsController.update
);

productsRouter.delete(
  "/:id",
  celebrate({ params: idValidator }),
  productsController.delete
);
export default productsRouter;
