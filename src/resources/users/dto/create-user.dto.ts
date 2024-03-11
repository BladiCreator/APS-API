import { IsString, IsUrl, MinLength } from "class-validator";

import { UserRegisterDto } from "@src/auth/dto/user-register.dto";

export class CreateUserDto extends UserRegisterDto {
	@IsString()
	@MinLength(3)
	first_name?: string;

	@IsString()
	@MinLength(3)
	last_name?: string;

	@IsString()
	@IsUrl()
	image_url?: string; //Investigate about this

	constructor(email: string, password: string, user_name: string, first_name: string, last_name: string, image_url: string) {
		super(email, password, user_name);
		this.first_name = user_name;
		this.last_name = user_name;
		this.image_url = user_name;
	}
}
