import { ApiProperty } from "@nestjs/swagger";
import { PEGIRating } from "@src/core/enums/pegi.enum";
import { IOrderPagination } from "@src/core/interfaces/order-pagination.interface";
import { ISearcher } from "@src/core/interfaces/searcher.interface";
import { Transform } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class FindApplicationDto implements IOrderPagination, ISearcher {
	@ApiProperty({ enum: ["ASC", "DESC"], required: false })
	@IsString()
	@IsOptional()
	order: "ASC" | "DESC"; // ascending or descending order

	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	limit: number; // maximum number of items to return

	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	offset: number; // number of items to skip

	@ApiProperty({ type: String, required: false })
	@IsString()
	@IsOptional()
	search: string;

	@ApiProperty({ type: String, required: false })
	@IsString()
	@IsOptional()
	name: string;

	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	min_price: number;

	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	max_price: number;

	@ApiProperty({ type: Number, required: false })
	@IsNumber()
	@IsOptional()
	discount: number;

	@ApiProperty({ type: String, required: false })
	@IsString()
	@IsOptional()
	categories: string;

	@ApiProperty({ type: Boolean, required: false })
	@Transform(({ value }) => ((value as string) === "true" ? true : false))
	@IsBoolean()
	@IsOptional()
	same_categories: boolean;

	@ApiProperty({ enum: PEGIRating, required: false })
	@IsString()
	@IsOptional()
	pegi_rating: PEGIRating;

	constructor(
		order: "ASC" | "DESC",
		limit: number,
		offset: number,
		search: string,
		name: string,
		min_price: number,
		max_price: number,
		discount: number,
		categories: string,
		same_categories: boolean,
		PEGI_rating: PEGIRating,
	) {
		this.order = order;
		this.limit = limit;
		this.offset = offset;
		this.search = search;

		this.name = name;
		this.min_price = min_price;
		this.max_price = max_price;
		this.discount = discount;
		this.categories = categories;
		this.same_categories = same_categories;
		this.pegi_rating = PEGI_rating;
	}
}
