import { ApiProperty } from "@nestjs/swagger";
import { TypePaymentCard } from "@src/common/enums/type_payment_card.enum";
import { UserConfiguration } from "@src/resources/user-configurations/entities/user-configuration.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "payment_cards" })
export class PaymentCard {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	//TODO: Ver como funcionaria esto
	@ApiProperty({ type: String })
	@Column("int", { unique: true, nullable: false })
	card_number = 0; // int (Encriptado)

	@ApiProperty({ type: Date })
	@Column("date")
	expiration_date: Date = new Date();

	@ApiProperty({ type: String })
	@Column("varchar", { length: 46 })
	owner_name = "";

	@ApiProperty({ enum: TypePaymentCard })
	@Column("enum", { enum: TypePaymentCard, default: TypePaymentCard.Debit })
	type_of_card: TypePaymentCard = TypePaymentCard.Debit;

	@ApiProperty({ type: () => UserConfiguration })
	@ManyToOne(
		() => UserConfiguration,
		(user_configuration) => user_configuration.payment_cards,
	)
	user_configuration!: UserConfiguration;
}
