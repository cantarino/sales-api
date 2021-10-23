import authConfig from "@config/auth";
import AppError from "@shared/errors/app-error";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
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

    //create service
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}
