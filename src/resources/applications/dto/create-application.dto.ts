import { ApiProperty } from "@nestjs/swagger";
import { PEGIRating } from "@src/common/enums/pegi.enum";
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
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(89)
	name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(1200)
	description: string;

	@ApiProperty()
	@IsNumber()
	@IsNotEmpty()
	@IsPositive()
	price: number;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(9)
	spaces: string;

	@ApiProperty({ type: [Category] })
	@IsArray()
	@IsNotEmpty()
	categories: Category[];

	@ApiProperty({ enum: PEGIRating })
	@IsNotEmpty()
	@IsString()
	pegi_rating: PEGIRating;

	constructor(
		name: string,
		description: string,
		price: number,
		spaces: string,
		categories: Category[],
		pegi_rating: PEGIRating,
	) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.spaces = spaces;
		this.categories = categories;
		this.pegi_rating = pegi_rating;
	}
}
