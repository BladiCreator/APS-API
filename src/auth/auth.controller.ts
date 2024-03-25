import {
	Body,
	Controller,
	Get,
	HttpCode,
	Inject,
	Logger,
	Post,
	Request,
	UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "../common/guards/auth.guard";
import { UserRequest } from "../common/interfaces/user-request.interface";
import { AuthService } from "./auth.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
@Controller("auth")
@ApiTags("Auth")
export class AuthController {
	constructor(
		@Inject(Logger) private readonly logger: Logger,
		private readonly authService: AuthService,
	) {}

	@Post("register")
	register(@Body() userRegisterDto: UserRegisterDto) {
		this.logger.log("Registering new user");
		return this.authService.register(userRegisterDto);
	}

	@Post("login")
	@HttpCode(200)
	login(@Body() userLoginDto: UserLoginDto) {
		this.logger.log("Logging in user");
		return this.authService.login(userLoginDto);
	}

	@ApiBearerAuth()
	@Get("user")
	@UseGuards(AuthGuard)
	user(@Request() req: UserRequest) {
		return req.user;
	}
}
