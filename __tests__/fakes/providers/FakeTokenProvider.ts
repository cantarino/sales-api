import { ITokenPayload } from "../../../src/shared/providers/TokenProvider/models/ITokenPayload";
import { ITokenProvider } from "../../../src/shared/providers/TokenProvider/models/ITokenProvider";

export class FakeTokenProvider implements ITokenProvider {
  signToken(user_id: string): string {
    return user_id;
  }
  getTokenPayload(token: string): ITokenPayload {
    return { iat: null, exp: null, sub: token };
  }
}
