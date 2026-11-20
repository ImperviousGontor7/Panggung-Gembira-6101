import prisma from "../config/prisma.js";
import { error } from "../utils/response.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { MESSAGE } from "../constants/message.js";

function extractBearerToken(req) {
  const authorization =
    req.headers.authorization;

  if (
    typeof authorization !== "string" ||
    !authorization.startsWith("Bearer ")
  ) {
    return null;
  }

  const token =
    authorization
      .slice(7)
      .trim();

  return token || null;
}

export async function requireAuth(
  req,
  res,
  next,
) {
  try {
    const token =
      extractBearerToken(req);

    if (!token) {
      return error(
        res,
        MESSAGE.UNAUTHORIZED,
        401,
      );
    }

    let payload;

    try {
      payload =
        verifyAccessToken(token);
    } catch {
      return error(
        res,
        MESSAGE.AUTH.TOKEN_INVALID,
        401,
      );
    }

    const userId =
      payload?.sub;

    if (
      typeof userId !== "string" ||
      !userId
    ) {
      return error(
        res,
        MESSAGE.AUTH.TOKEN_INVALID,
        401,
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          username: true,
          email: true,
          fullName: true,
          avatar: true,
          bio: true,
          role: true,
          status: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
          deletedAt: true,
        },
      });

    if (!user) {
      return error(
        res,
        MESSAGE.AUTH.USER_NOT_FOUND,
        401,
      );
    }

    if (user.deletedAt) {
      return error(
        res,
        "Akun telah dihapus.",
        401,
      );
    }

    if (!user.isActive) {
      return error(
        res,
        MESSAGE.AUTH.USER_DISABLED,
        403,
      );
    }

    if (user.status !== "ACTIVE") {
      return error(
        res,
        MESSAGE.AUTH.USER_DISABLED,
        403,
      );
    }

    req.user = user;

    req.auth = {
      userId: user.id,
      role: user.role,
      tokenPayload: payload,
    };

    return next();
  } catch (err) {
    return next(err);
  }
}

export const authMiddleware =
  requireAuth;

export default requireAuth;