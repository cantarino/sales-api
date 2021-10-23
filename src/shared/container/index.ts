import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomerRepository";
import { CustomersRepository } from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { container } from "tsyringe";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository
);
