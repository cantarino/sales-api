import authConfig from "@config/auth";
import { sign, verify } from "jsonwebtoken";
import { ITokenPayload } from "../models/ITokenPayload";
import { ITokenProvider } from "../models/ITokenProvider";

export class JWTTokenProvider implements ITokenProvider {
  public signToken(user_id: string): string {
    return sign({}, authConfig.jwt.secret, {
      subject: user_id,
      expiresIn: authConfig.jwt.expiresIn,
    });
  }
  public getTokenPayload(token: string): ITokenPayload {
    return getTokenPayload(token);
  }
}

//Check provider in express
export function getTokenPayload(token: string) {
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { iat, exp, sub } = decodedToken as ITokenPayload;

    return { iat, exp, sub };
  } catch {
    return { iat: null, exp: null, sub: null };
  }
}
