import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { UserJWT } from "../common/interfaces/user-jwt.interface";
import { UsersService } from "../resources/users/users.service";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";

@Injectable()
export class AuthService {
	private readonly saltOrRounds: number = 10;

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async register(userRegisterDto: UserRegisterDto): Promise<void> {
		const user = await this.usersService.finOneByEmail(userRegisterDto.email);

		//Si existe lanza una error
		if (user) {
			throw new BadRequestException("User already exists!");
		}

		const hashPassword = await bcrypt.hash(
			userRegisterDto.password,
			this.saltOrRounds,
		);

		userRegisterDto.password = hashPassword;

		await this.usersService.create(userRegisterDto);
	}

	async login(userLoginDto: UserLoginDto): Promise<UserJWT> {
		const user = await this.usersService.finOneByEmailToSignIn(
			userLoginDto.email,
		);

		//Si no existe lanza una error
		if (!user) {
			throw new UnauthorizedException(); //"Email does not exist!"
		}

		const isPasswordValid = await bcrypt.compare(
			userLoginDto.password,
			user.password,
		);

		if (!isPasswordValid) {
			throw new UnauthorizedException(); //"Password is wrong!"
		}

		const payload = {
			email: user.email,
			role: user.role,
		};

		const token = await this.jwtService.signAsync(payload);

		return {
			token: token,
			email: user.email,
			role: user.role,
		};
	}
}
