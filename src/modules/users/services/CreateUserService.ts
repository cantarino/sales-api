import AppError from "@shared/errors/app-error";
import { IHashProvider } from "@shared/providers/HashProvider/models/IHashProvider";
import { inject, injectable } from "tsyringe";
import { ICreateUser } from "../domain/entities/ICreateUser";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { User } from "../infra/typeorm/entities/User";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}
  public async execute({ name, email, password }: ICreateUser): Promise<User> {
    const emailExists = await this.usersRepository.findByEmail(email);

    const hashedPassword = await this.hashProvider.generateHash(password);
    if (emailExists)
      throw new AppError("There is already a user with this email");

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}
