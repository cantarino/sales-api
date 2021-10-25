import { container } from "tsyringe";
import { ProductCacheProvider } from "./implementations/ProductCacheProvider";
import { IProductCacheProvider } from "./models/IProductCacheProvider";

container.registerSingleton<IProductCacheProvider>(
  "ProductCacheProvider",
  ProductCacheProvider
);
