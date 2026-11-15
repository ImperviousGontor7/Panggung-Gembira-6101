import bcrypt from "bcrypt";

const BCRYPT_SALT_ROUNDS = 12;

export async function hashPassword(
  password,
) {
  if (
    typeof password !== "string" ||
    password.length === 0
  ) {
    throw new TypeError(
      "Password harus berupa string yang tidak kosong.",
    );
  }

  return bcrypt.hash(
    password,
    BCRYPT_SALT_ROUNDS,
  );
}

export async function comparePassword(
  password,
  hash,
) {
  if (
    typeof password !== "string" ||
    typeof hash !== "string" ||
    !password ||
    !hash
  ) {
    return false;
  }

  return bcrypt.compare(
    password,
    hash,
  );
}

export const PASSWORD_CONFIG =
  Object.freeze({
    algorithm: "bcrypt",
    saltRounds:
      BCRYPT_SALT_ROUNDS,
  });