import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoginDto {
	
	@IsEmail()
	@IsNotEmpty()
	email: string;
	
	@Transform(({ value }) => (value as string).trim())
	@IsString()
	@MinLength(6)
	@IsNotEmpty()
	password: string;

	constructor(email: string, password: string) {
		this.email = email;
		this.password = password;
	}
}
