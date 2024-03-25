import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateOperatingSystemDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(60)
	name: string;

	constructor(name: string) {
		this.name = name;
	}
}
