import AppError from "@shared/errors/app-error";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICustomer";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";

export class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) throw new AppError("Email address already used.");

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}
