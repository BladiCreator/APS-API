import { ApiProperty } from "@nestjs/swagger";
import { BankAccount } from "@src/resources/bank-accounts/entities/bank-account.entity";
import { PaymentCard } from "@src/resources/payment-card/entities/payment-card.entity";
import {
	IsArray,
	IsBoolean,
	IsOptional,
	IsString,
	MaxLength,
} from "class-validator";

export class CreateUserConfigurationDto {
	@ApiProperty()
	@IsString()
	@MaxLength(10)
	theme: string;

	@ApiProperty()
	@IsString()
	@MaxLength(20)
	language: string;

	@ApiProperty()
	@IsBoolean()
	web_receive_promotions: boolean;

	@ApiProperty()
	@IsBoolean()
	web_notifications_applications_updates: boolean;

	@ApiProperty()
	@IsBoolean()
	web_notifications_exclusive_offers: boolean;

	@ApiProperty()
	@IsBoolean()
	developer_issues_report: boolean;

	@ApiProperty()
	@IsBoolean()
	developer_bugs_report: boolean;

	@ApiProperty({ type: [PaymentCard] })
	@IsArray()
	@IsOptional()
	payment_cards!: PaymentCard[];

	@ApiProperty({ type: BankAccount })
	@IsOptional()
	bank_accounts!: BankAccount;

	constructor(
		theme: string,
		language: string,
		web_receive_promotions: boolean,
		web_notifications_applications_updates: boolean,
		web_notifications_exclusive_offers: boolean,
		developer_issues_report: boolean,
		developer_bugs_report: boolean,
	) {
		this.theme = theme;
		this.language = language;
		this.web_receive_promotions = web_receive_promotions;
		this.web_notifications_applications_updates =
			web_notifications_applications_updates;
		this.web_notifications_exclusive_offers =
			web_notifications_exclusive_offers;
		this.developer_issues_report = developer_issues_report;
		this.developer_bugs_report = developer_bugs_report;
	}
}
