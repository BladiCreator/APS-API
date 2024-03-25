import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { TypeBankAccount } from "@src/common/enums/type_bank_account.enum";
import { Column, Entity } from "typeorm";

@Entity({ name: "bank_accounts" })
export class BankAccount extends AbstractEntity {
	//TODO: Investigar la longitud del numero de cuenta
	@ApiProperty({ type: String })
	@Column("varchar", { length: 60 })
	account_number = "";

	@ApiProperty({ type: String })
	@Column("varchar", { length: 46 })
	owner_name = "";

	@ApiProperty({ enum: TypeBankAccount })
	@Column("enum", { enum: TypeBankAccount, default: TypeBankAccount.Checking })
	type_account: TypeBankAccount = TypeBankAccount.Checking;

	@ApiProperty({ type: String })
	@Column("varchar", { length: 21 })
	bank_name = "";

	@ApiProperty({ type: String })
	@Column("varchar", { length: 11 })
	bank_identification_code = "";
}
