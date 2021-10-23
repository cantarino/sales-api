import { IUser } from "./IUser";

export interface ISession {
  user: IUser;
  token: string;
}
