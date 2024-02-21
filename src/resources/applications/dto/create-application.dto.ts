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

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	price = 0;

	@IsString()
	@IsNotEmpty()
	@MaxLength(9)
	spaces = "";
}
