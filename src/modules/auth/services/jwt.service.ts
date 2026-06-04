import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { accessTokenPayloadSchema, refreshTokenPayloadSchema } from "../types/jwt.types.js";
import type { AccessTokenPayload, RefreshTokenPayload } from "../types/jwt.types.js";
import { env } from "../../../config/env.js";

export class JwtService {

  private readonly accessTokenExpiresIn = env.JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"];
  private readonly refreshTokenExpiresIn =  env.JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"];

  signAccessToken(payload: AccessTokenPayload): string {
    const options: SignOptions = {};
    if (this.accessTokenExpiresIn !== undefined) options.expiresIn = this.accessTokenExpiresIn;
    return jwt.sign(payload, env.JWT_ACCESS_SECRET as jwt.Secret, options);
  }

  signRefreshToken(payload: RefreshTokenPayload): string {
    const options: SignOptions = {};
    if (this.refreshTokenExpiresIn !== undefined) options.expiresIn = this.refreshTokenExpiresIn;
    return jwt.sign(payload, env.JWT_REFRESH_SECRET as jwt.Secret, options);
  }

  verifyAccessToken(token: string): AccessTokenPayload {
    const decoded =jwt.verify(token, env.JWT_ACCESS_SECRET);
    return accessTokenPayloadSchema.parse(decoded);
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET);
    return refreshTokenPayloadSchema.parse(decoded);
  }
}