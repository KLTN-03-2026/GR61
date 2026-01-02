import jwt, { Secret, SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as Secret;
const ACCESS_EXPIRES_IN = Number(process.env.JWT_EXPIRES_IN || 3600);
const REFRESH_EXPIRES_IN = Number(
  process.env.REFRESH_TOKEN_EXPIRES_IN || 604800
);

export const jwtService = {
  // access token
  signAccessToken(payload: object) {
    const options: SignOptions = { expiresIn: ACCESS_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
  },

  // refresh token
  signRefreshToken(payload: object) {
    const options: SignOptions = { expiresIn: REFRESH_EXPIRES_IN };
    return jwt.sign(payload, JWT_SECRET, options);
  },

  // verify token
  verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET, { clockTolerance: 10 }); // cho phép lệch 10 giây
  },
};
