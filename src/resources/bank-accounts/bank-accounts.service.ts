import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateBankAccountDto } from "./dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "./dto/update-bank-account.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BankAccount } from "./entities/bank-account.entity";
import { Repository } from "typeorm";

@Injectable()
export class BankAccountsService {
	constructor(
		@InjectRepository(BankAccount)
		private readonly bankAccountRepository: Repository<BankAccount>,
	) {}

	async create(createBankAccountDto: CreateBankAccountDto) {
		return await this.bankAccountRepository.save(createBankAccountDto);
	}

	async findAll() {
		return await this.bankAccountRepository.find();
	}

	async findOne(id: string) {
		const bankAccount = await this.bankAccountRepository.findOneBy({ id: id });

		if (!bankAccount) {
			throw new NotFoundException("Bank account not found");
		}

		return bankAccount;
	}

	async update(id: string, updateBankAccountDto: UpdateBankAccountDto) {
		return await this.bankAccountRepository.save({
			id: id,
			...updateBankAccountDto,
		});
	}

	async remove(id: string) {
		const bankAccount = await this.findOne(id);

		return await this.bankAccountRepository.remove(bankAccount);
	}
}
