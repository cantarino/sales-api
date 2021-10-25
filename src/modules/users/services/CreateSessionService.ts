import AppError from "@shared/errors/app-error";
import { createToken } from "@shared/providers/TokenProvider/implementations/JWTTokenProvider";
import { compare } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { ICreateSession } from "../domain/entities/ICreateSession";
import { ISession } from "../domain/entities/ISession";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
export class CreateSessionService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: ICreateSession): Promise<ISession> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw new AppError("Incorrect email/password combination.", 401);

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed)
      throw new AppError("Incorrect email/password combination.", 401);

    const token = createToken(user.id);

    return { user, token };
  }
}
