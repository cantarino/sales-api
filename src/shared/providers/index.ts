import "@modules/products/providers/ProductCacheProvider";
import { container } from "tsyringe";
import { bcryptHashProvider } from "./HashProvider/implementations/bcryptHashProvider";
import { IHashProvider } from "./HashProvider/models/IHashProvider";

container.registerSingleton<IHashProvider>("HashProvider", bcryptHashProvider);
