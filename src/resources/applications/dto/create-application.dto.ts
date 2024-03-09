import { Category } from "@src/resources/categories/entities/category.entity";
import {
	IsArray,
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
	@MaxLength(1200)
	description = "";

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	price = 0;

	@IsString()
	@IsNotEmpty()
	@MaxLength(9)
	spaces = "";

	@IsArray()
	@IsNotEmpty()
	categories: Category[] = [];
}
