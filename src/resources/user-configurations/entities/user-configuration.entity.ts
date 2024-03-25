import { ApiProperty } from "@nestjs/swagger";
import { BankAccount } from "@src/resources/bank-accounts/entities/bank-account.entity";
import { PaymentCard } from "@src/resources/payment-card/entities/payment-card.entity";
import {
	Column,
	Entity,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "user_configurations" })
export class UserConfiguration {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@ApiProperty({ type: String })
	@Column("varchar", { length: 10, default: "light" })
	theme = "light";

	@ApiProperty({ type: String })
	@Column("varchar", { length: 20, default: "en" })
	language = "";

	@ApiProperty({ type: Boolean, default: false })
	@Column("boolean")
	web_receive_promotions = false;

	@ApiProperty({ type: Boolean, default: false })
	@Column("boolean")
	web_notifications_applications_updates = false;

	@ApiProperty({ type: Boolean, default: false })
	@Column("boolean")
	web_notifications_exclusive_offers = false;

	@ApiProperty({ type: Boolean, default: false })
	@Column("boolean")
	developer_issues_report = false;

	@ApiProperty({ type: Boolean, default: false })
	@Column("boolean")
	developer_bugs_report = false;

	@ApiProperty({ type: () => PaymentCard })
	@OneToMany(
		() => PaymentCard,
		(payment_card) => payment_card.user_configuration,
	)
	payment_cards!: PaymentCard[];

	@ApiProperty({ type: () => BankAccount })
	@OneToOne(() => BankAccount)
	bank_accounts!: BankAccount;
}
