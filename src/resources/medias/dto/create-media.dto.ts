import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateMediaDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(600)
	@IsUrl()
	url: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	alt: string;

	constructor(url: string, alt: string) {
		this.url = url;
		this.alt = alt;
	}
}
