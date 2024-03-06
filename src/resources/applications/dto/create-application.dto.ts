import {
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	MaxLength,
} from "class-validator";

export class CreateApplicationDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(89)
	name = "";

	@IsString()
	@IsNotEmpty()
	@MaxLength(500)
	description = "";

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	price = 0;

	@IsString()
	@IsNotEmpty()
	@MaxLength(9)
	spaces = "";
}
