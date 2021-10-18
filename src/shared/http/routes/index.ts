import productsRouter from "@modules/products/routes/products.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/product", productsRouter);
routes.use("/user", usersRouter);

export default routes;
