import customersRouter from "@modules/customers/infra/http/routes/customers.routes";
import ordersRouter from "@modules/orders/infra/http/routes/orders.routes";
import productsRouter from "@modules/products/infra/http/routes/products.routes";
import passwordsRouter from "@modules/users/infra/http/routes/password.routes";
import profileRouter from "@modules/users/infra/http/routes/profile.routes";
import sessionsRouter from "@modules/users/infra/http/routes/sessions.routes";
import usersRouter from "@modules/users/infra/http/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/product", productsRouter);
routes.use("/user", usersRouter);
routes.use("/session", sessionsRouter);
routes.use("/password", passwordsRouter);
routes.use("/profile", profileRouter);
routes.use("/customer", customersRouter);
routes.use("/order", ordersRouter);

export default routes;
