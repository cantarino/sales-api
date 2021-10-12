import productsRouter from "@modules/products/routes/products.routes";
import { Router } from "express";

const routes = Router();

routes.use("/product", productsRouter);

export default routes;
