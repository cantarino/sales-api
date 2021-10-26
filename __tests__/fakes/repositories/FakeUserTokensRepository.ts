import { IUserTokensRepository } from "../../../src/modules/users/domain/repositories/IUserTokensRepository";
import { UserToken } from "../../../src/modules/users/infra/typeorm/entities/UserToken";
import { DateUtils } from "../../../src/shared/utils/DateUtils";
import { generateString } from "../../utils/utils";

export class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  async findById(id: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find((userToken) => userToken.id == id);

    return userToken;
  }
  async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.token == token
    );

    return userToken;
  }
  async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = generateString();
    userToken.token = generateString();
    userToken.user_id = user_id;
    userToken.created_at = new Date();

    this.userTokens = [...this.userTokens, userToken];

    return userToken;
  }
  async generateExpired(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    userToken.id = generateString();
    userToken.token = generateString();
    userToken.user_id = user_id;
    userToken.created_at = DateUtils.addHours(new Date(), -3);

    this.userTokens = [...this.userTokens, userToken];

    return userToken;
  }
}
