import AppError from "@shared/errors/app-error";
import { getCustomRepository } from "typeorm";
import { UserTokensRepository } from "../typeorm/repositories/user-tokens-repository";
import { UserRepository } from "../typeorm/repositories/users-repository";

interface IRequest {
  email: string;
}

export class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("There is no user with this email");
    }

    const userToken = await usersTokenRepository.generate(user.id);

    console.log(userToken);
  }
}
