import { ApiProperty } from "@nestjs/swagger";
import { TypeBankAccount } from "@src/common/enums/type_bank_account.enum";
import { IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateBankAccountDto {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(255)
	account_number: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(46)
	owner_name: string;

	@ApiProperty()
	@IsEnum(TypeBankAccount)
	@IsNotEmpty()
	type_account: TypeBankAccount;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(21)
	bank_name: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	@MaxLength(11)
	bank_identification_code: string;

	constructor(
		account_number: string,
		owner_name: string,
		type_account: TypeBankAccount,
		bank_name: string,
		bank_identification_code: string,
	) {
		this.account_number = account_number;
		this.owner_name = owner_name;
		this.type_account = type_account;
		this.bank_name = bank_name;
		this.bank_identification_code = bank_identification_code;
	}
}
