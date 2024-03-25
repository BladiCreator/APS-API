import { IsOptional, IsString, MinLength } from "class-validator";

import { UserRegisterDto } from "@src/auth/dto/user-register.dto";

export class CreateUserDto extends UserRegisterDto {
	@IsOptional()
	@IsString()
	@MinLength(3)
	first_name?: string;

	@IsOptional()
	@IsString()
	@MinLength(3)
	last_name?: string;

	constructor(
		email: string,
		password: string,
		user_name: string,
		first_name: string,
		last_name: string,
	) {
		super(email, password, user_name);
		this.first_name = first_name;
		this.last_name = last_name;
	}
}
