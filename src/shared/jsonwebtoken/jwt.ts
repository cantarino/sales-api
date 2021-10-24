import authConfig from "@config/auth";
import { sign, verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export function createToken(user_id: string) {
  return sign({}, authConfig.jwt.secret, {
    subject: user_id,
    expiresIn: authConfig.jwt.expiresIn,
  });
}

export function getTokenPayload(token: string) {
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { iat, exp, sub } = decodedToken as ITokenPayload;

    return { iat, exp, sub };
  } catch {
    return { iat: null, exp: null, sub: null };
  }
}
