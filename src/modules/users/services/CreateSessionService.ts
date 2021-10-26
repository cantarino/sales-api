import AppError from "@shared/errors/app-error";
import { IHashProvider } from "@shared/providers/HashProvider/models/IHashProvider";
import { ITokenProvider } from "@shared/providers/TokenProvider/models/ITokenProvider";
import { inject, injectable } from "tsyringe";
import { ICreateSession } from "../domain/entities/ICreateSession";
import { ISession } from "../domain/entities/ISession";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class CreateSessionService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("HashProvider")
    private hashProvider: IHashProvider,
    @inject("TokenProvider")
    private tokenProvider: ITokenProvider
  ) {}

  public async execute({ email, password }: ICreateSession): Promise<ISession> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Incorrect email/password combination.", 401);

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password
    );
    if (!passwordConfirmed)
      throw new AppError("Incorrect email/password combination.", 401);

    const token = this.tokenProvider.signToken(user.id);

    return { user, token };
  }
}
