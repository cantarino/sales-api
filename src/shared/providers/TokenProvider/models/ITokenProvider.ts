import { ITokenPayload } from "./ITokenPayload";

export interface ITokenProvider {
  signToken(user_id: string): string;
  getTokenPayload(token: string): ITokenPayload;
}
