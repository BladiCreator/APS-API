import { ApiProperty } from "@nestjs/swagger";
import { TypeBankAccount } from "@src/common/enums/type_bank_account.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "bank_accounts" })
export class BankAccount {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

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
