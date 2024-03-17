// eslint-disable-next-line node/no-extraneous-import
import { FastifyRequest } from "fastify";

export interface UserRequest extends FastifyRequest {
	user: {
		email: string;
		role: string;
	};
}
