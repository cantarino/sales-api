import productsRouter from "@modules/products/routes/products.routes";
import passwordsRouter from "@modules/users/routes/password.routes";
import profileRouter from "@modules/users/routes/profile.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/product", productsRouter);
routes.use("/user", usersRouter);
routes.use("/session", sessionsRouter);
routes.use("/password", passwordsRouter);
routes.use("/profile", profileRouter);

export default routes;
