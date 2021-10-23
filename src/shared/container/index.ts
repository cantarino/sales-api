import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomerRepository";
import { CustomersRepository } from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import "reflect-metadata";
import { container } from "tsyringe";
import { IOrdersRepository } from "../../modules/orders/domain/repositories/IOrdersRepository";
import { OrdersRepository } from "../../modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductsRepository } from "../../modules/products/domain/repositories/IProductsRepository";
import { ProductsRepository } from "../../modules/products/infra/typeorm/repositories/ProductsRepository";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);

container.registerSingleton<IProductsRepository>(
  "ProductsRepository",
  ProductsRepository
);

container.registerSingleton<IOrdersRepository>(
  "OrdersRepository",
  OrdersRepository
);
