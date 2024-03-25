import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { UsersModule } from "@src/resources/users/users.module";

import { jwtConstants } from "../common/constants/jwt.constant";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		UsersModule,
		JwtModule.register({
			global: true, //TODO: global have to be false
			secret: jwtConstants.secret,
			signOptions: { expiresIn: "2w" },
		}),
	],
})
export class AuthModule {}
