import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

import { UserLoginDto } from "./user-login.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UserRegisterDto extends UserLoginDto {
	@ApiProperty({ type: String , minLength: 3})
	@IsNotEmpty()
	@Transform(({ value }) => (value as string).trim())
	@IsString()
	@MinLength(3)
	user_name: string;

	constructor(email: string, password: string, user_name: string) {
		super(email, password);
		this.user_name = user_name;
	}
}
