import AppError from "@shared/errors/app-error";
import { hash } from "bcryptjs";
import { addHours, isAfter } from "date-fns";
import { getCustomRepository } from "typeorm";
import { UserTokensRepository } from "../typeorm/repositories/user-tokens-repository";
import { UserRepository } from "../typeorm/repositories/users-repository";
interface IRequest {
  token: string;
  password: string;
}

export class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const usersTokenRepository = getCustomRepository(UserTokensRepository);

    const userToken = await usersTokenRepository.findByToken(token);
    if (!userToken) throw new AppError("User token not found");

    const user = await usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError("User doest not exist");

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError("Expired token");

    user.password = await hash(password, 8);
  }
}
