import AppError from "@shared/errors/app-error";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/user";
import { UserRepository } from "../typeorm/repositories/users-repository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

export class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UserRepository);
    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    return { user };
  }
}
