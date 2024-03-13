import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class UserLoginDto {
	
	@ApiProperty({ type: String })
	@IsEmail()
	@IsNotEmpty()
	email: string;
	
	@ApiProperty({ type: String })
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
