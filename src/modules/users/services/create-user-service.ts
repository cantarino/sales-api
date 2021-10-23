import AppError from "@shared/errors/app-error";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { User } from "../infra/typeorm/entities/user";
import { UserRepository } from "../infra/typeorm/repositories/users-repository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);
    const emailExists = await usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);
    if (emailExists) {
      throw new AppError("There is already a user with this email");
    }

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await usersRepository.save(user);

    return user;
  }
}
