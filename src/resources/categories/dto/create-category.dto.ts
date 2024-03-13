import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	@MaxLength(21)
	name = "";
}
