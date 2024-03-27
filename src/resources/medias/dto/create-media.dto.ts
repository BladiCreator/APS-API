import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreateMediaDto {
	@ApiProperty()
	@IsString()
	@MaxLength(600)
	@IsOptional()
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
