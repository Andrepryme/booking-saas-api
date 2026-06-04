import { z } from "zod";
import { userRoles } from "../../users/types/user.types.js";

// Access token payload typically contains the user ID (sub) and role to allow for authorization checks
export const accessTokenPayloadSchema =
  z.object({
    sub: z.uuid(),
    role: z.enum(userRoles)
  });
export type AccessTokenPayload = z.infer<typeof accessTokenPayloadSchema>;

// Refresh token payload typically only contains the user ID (sub) to keep it small and secure
export const refreshTokenPayloadSchema =
  z.object({
    sub: z.uuid()
  });
export type RefreshTokenPayload = z.infer<typeof refreshTokenPayloadSchema>;