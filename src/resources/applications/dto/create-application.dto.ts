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
	name: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1200)
	description: string;

	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	price: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(9)
	spaces: string;

	@IsArray()
	@IsNotEmpty()
	categories: Category[];

	constructor(
		name: string,
		description: string,
		price: number,
		spaces: string,
		categories: Category[],
	) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.spaces = spaces;
		this.categories = categories;
	}
}
