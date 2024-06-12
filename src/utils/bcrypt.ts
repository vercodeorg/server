import * as bcrypt from "bcrypt";

export async function encodePassword(rawPassword: string) {
  const saltOrRounds = 10;
  return bcrypt.hash(rawPassword, saltOrRounds);
}

export async function comparePassword(
  rawPassword: string,
  hashPassword: string
) {
  return bcrypt.compare(rawPassword, hashPassword);
}
