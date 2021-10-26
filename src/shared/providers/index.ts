import "@modules/products/providers/ProductCacheProvider";
import { container } from "tsyringe";
import { bcryptHashProvider } from "./HashProvider/implementations/bcryptHashProvider";
import { IHashProvider } from "./HashProvider/models/IHashProvider";
import { NodemailerMailProvider } from "./MailProvider/implementations/NodemailerMailProvider";
import { IMailProvider } from "./MailProvider/models/IMailProvider";
import { JWTTokenProvider } from "./TokenProvider/implementations/JWTTokenProvider";
import { ITokenProvider } from "./TokenProvider/models/ITokenProvider";

container.registerSingleton<IHashProvider>("HashProvider", bcryptHashProvider);
container.registerSingleton<ITokenProvider>("TokenProvider", JWTTokenProvider);
container.registerSingleton<IMailProvider>(
  "MailProvider",
  NodemailerMailProvider
);
