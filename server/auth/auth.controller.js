import { MESSAGE } from "../constants/message.js";
import { APP_ENV } from "../config/env.js";
import { success } from "../utils/response.js";

import {
  registerUser,
  loginUser,
  refreshUserSession,
  getCurrentUser,
  logoutUser,
} from "./auth.service.js";

const REFRESH_COOKIE_NAME = "refreshToken";

function getRefreshCookieOptions() {
  const isProduction =
    APP_ENV.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    path: "/api/auth",
    maxAge: APP_ENV.JWT_REFRESH_EXPIRES_IN_MS,
  };
}

function setRefreshCookie(res, token) {
  res.cookie(
    REFRESH_COOKIE_NAME,
    token,
    getRefreshCookieOptions(),
  );
}

function clearRefreshCookie(res) {
  res.clearCookie(
    REFRESH_COOKIE_NAME,
    getRefreshCookieOptions(),
  );
}

export async function register(req, res, next) {
  try {
    const result = await registerUser({
      username: req.body?.username,
      email: req.body?.email,
      password: req.body?.password,
      fullName: req.body?.fullName,
    });

    setRefreshCookie(
      res,
      result.refreshToken,
    );

    return success(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      MESSAGE.AUTH.REGISTER_SUCCESS,
      201,
    );
  } catch (err) {
    return next(err);
  }
}

export async function login(req, res, next) {
  try {
    const result = await loginUser({
      email: req.body?.email,
      password: req.body?.password,
    });

    setRefreshCookie(
      res,
      result.refreshToken,
    );

    return success(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      MESSAGE.AUTH.LOGIN_SUCCESS,
    );
  } catch (err) {
    return next(err);
  }
}

export async function refresh(req, res, next) {
  try {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE_NAME];

    const result =
      await refreshUserSession(
        refreshToken,
      );

    setRefreshCookie(
      res,
      result.refreshToken,
    );

    return success(
      res,
      {
        user: result.user,
        accessToken: result.accessToken,
      },
      MESSAGE.AUTH.REFRESH_SUCCESS,
    );
  } catch (err) {
    clearRefreshCookie(res);
    return next(err);
  }
}

export async function me(req, res, next) {
  try {
    const user =
      await getCurrentUser(req.user);

    return success(
      res,
      { user },
      MESSAGE.SUCCESS,
    );
  } catch (err) {
    return next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const refreshToken =
      req.cookies?.[REFRESH_COOKIE_NAME] ||
      null;

    const result =
      await logoutUser({
        userId: req.user?.id || null,
        refreshToken,
      });

    clearRefreshCookie(res);

    return success(
      res,
      result,
      MESSAGE.AUTH.LOGOUT_SUCCESS,
    );
  } catch (err) {
    clearRefreshCookie(res);
    return next(err);
  }
}