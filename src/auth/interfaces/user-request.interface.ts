// eslint-disable-next-line node/no-extraneous-import
import { FastifyRequest } from "fastify";

import { UserJWT } from "./user-jwt.interface";

export interface UserRequest extends FastifyRequest {
  user?: UserJWT;
}
