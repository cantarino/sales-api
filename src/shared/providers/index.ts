import "@modules/products/providers/ProductCacheProvider";
import { container } from "tsyringe";
import { bcryptHashProvider } from "./HashProvider/implementations/bcryptHashProvider";
import { IHashProvider } from "./HashProvider/models/IHashProvider";
import { JWTTokenProvider } from "./TokenProvider/implementations/JWTTokenProvider";
import { ITokenProvider } from "./TokenProvider/models/ITokenProvider";

container.registerSingleton<IHashProvider>("HashProvider", bcryptHashProvider);
container.registerSingleton<ITokenProvider>("TokenProvider", JWTTokenProvider);
