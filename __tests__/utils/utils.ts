import * as crypto from "crypto";

export function generateString() {
  return crypto.randomBytes(20).toString("hex");
}
