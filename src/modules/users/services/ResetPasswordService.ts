import AppError from "@shared/errors/app-error";
import { IHashProvider } from "@shared/providers/HashProvider/models/IHashProvider";
import { addHours, isAfter } from "date-fns";
import { inject, injectable } from "tsyringe";
import { IResetPassword } from "../domain/entities/IResetPassword";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";
import { IUserTokensRepository } from "../domain/repositories/IUserTokensRepository";

@injectable()
export class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);
    if (!userToken) throw new AppError("User token not found");

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) throw new AppError("User doest not exist");

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError("Expired token");

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }
}
