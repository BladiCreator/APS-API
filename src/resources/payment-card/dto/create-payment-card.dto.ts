import { ApiProperty } from "@nestjs/swagger";
import { TypePaymentCard } from "@src/common/enums/type_payment_card.enum";
import {
	IsDate,
	IsEnum,
	IsNotEmpty,
	IsNumber,
	IsPositive,
	IsString,
	MaxLength,
} from "class-validator";

export class CreatePaymentCardDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	@IsPositive()
	card_number: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsDate()
	expiration_date: Date;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(46)
	owner_name: string;

	@ApiProperty({ enum: TypePaymentCard })
	@IsNotEmpty()
	@IsEnum(TypePaymentCard)
	type_of_card: TypePaymentCard;

	constructor(
		card_number: number,
		expiration_date: Date,
		owner_name: string,
		type_of_card: TypePaymentCard,
	) {
		this.card_number = card_number;
		this.expiration_date = expiration_date;
		this.owner_name = owner_name;
		this.type_of_card = type_of_card;
	}
}
