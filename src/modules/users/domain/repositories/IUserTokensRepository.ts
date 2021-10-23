import { IUserToken } from "../entities/IUserToken";

export interface IUserTokensRepository {
  findById(id: string): Promise<IUserToken | undefined>;
  findByToken(token: string): Promise<IUserToken | undefined>;
  generate(user_id: string): Promise<IUserToken>;
  // save(userToken: IUserToken): Promise<IUserToken>;
  // remove(userToken: IUserToken): Promise<void>;
}
