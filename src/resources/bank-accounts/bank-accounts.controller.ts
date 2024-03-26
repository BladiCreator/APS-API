import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@src/common/guards/auth.guard"; 
import { BankAccountsService } from "./bank-accounts.service";
import { CreateBankAccountDto } from "./dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "./dto/update-bank-account.dto";

@Controller("bank-accounts")
@ApiTags("Bank Accounts")
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BankAccountsController {
	constructor(private readonly bankAccountsService: BankAccountsService) {}

	@Post()
	@ApiBody({ type: CreateBankAccountDto })
	create(@Body() createBankAccountDto: CreateBankAccountDto) {
		return this.bankAccountsService.create(createBankAccountDto);
	}

	@Get()
	findAll() {
		return this.bankAccountsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.bankAccountsService.findOne(id);
	}

	@Patch(":id")
	@ApiBody({ type: CreateBankAccountDto })
	update(
		@Param("id") id: string,
		@Body() updateBankAccountDto: UpdateBankAccountDto,
	) {
		return this.bankAccountsService.update(id, updateBankAccountDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.bankAccountsService.remove(id);
	}
}
