import { EntityRepository, Repository } from "typeorm";
import { UserToken } from "../entities/user-token";

@EntityRepository(UserToken)
export class UserTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ where: { token } });
    return userToken;
  }

  public async findById(id: string): Promise<UserToken | undefined> {
    const userToken = await this.findOne({ where: { id } });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = this.create({ user_id });
    await this.save(userToken);
    return userToken;
  }
}