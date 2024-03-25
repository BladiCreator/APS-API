import { ApiProperty } from "@nestjs/swagger";
import { PEGIRating } from "@src/common/enums/pegi.enum";
import { Category } from "@src/resources/categories/entities/category.entity";
import { Media } from "@src/resources/medias/entities/media.entity";
import {
	IsArray,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	MaxLength,
} from "class-validator";
import { OperatingSystem } from "../../operating-systems/entities/operating-system.entity";

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

	@ApiProperty({ enum: PEGIRating })
	@IsNotEmpty()
	@IsEnum(PEGIRating)
	pegi_rating: PEGIRating;

	@ApiProperty({ type: [Media] })
	@IsArray()
	@IsNotEmpty()
	medias: Media[];

	@ApiProperty({ type: [Category] })
	@IsArray()
	@IsNotEmpty()
	categories: Category[];

	@ApiProperty({ type: [OperatingSystem] })
	@IsArray()
	@IsNotEmpty()
	operatingSystem: OperatingSystem[];

	constructor(
		name: string,
		description: string,
		price: number,
		spaces: string,
		pegi_rating: PEGIRating,
		medias: Media[],
		operatingSystem: OperatingSystem[],
		categories: Category[],
	) {
		this.name = name;
		this.description = description;
		this.price = price;
		this.spaces = spaces;
		this.pegi_rating = pegi_rating;
		this.medias = medias;
		this.operatingSystem = operatingSystem;
		this.categories = categories;
	}
}
