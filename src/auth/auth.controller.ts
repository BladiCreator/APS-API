import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { AuthGuard } from "./guards/auth.guard";
import { UserRequest } from "./interfaces/user-request.interface";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("register")
	register(@Body() userRegisterDto: UserRegisterDto) {
		return this.authService.register(userRegisterDto);
	}

	@Post("login")
	@HttpCode(200)
	login(@Body() userLoginDto: UserLoginDto) {
		return this.authService.login(userLoginDto);
	}

	@Get("user")
	@UseGuards(AuthGuard)
	user(@Request() req: UserRequest) {
		return req.user;
	}
}
