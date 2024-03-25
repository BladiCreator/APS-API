import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from "@nestjs/common";
import { BankAccountsService } from "./bank-accounts.service";
import { CreateBankAccountDto } from "./dto/create-bank-account.dto";
import { UpdateBankAccountDto } from "./dto/update-bank-account.dto";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { UserRoles } from "@src/common/decorators/roles.decorator";

@Controller("bank-accounts")
@ApiTags("Bank Accounts")
@UseGuards(AuthGuard)
export class BankAccountsController {
	constructor(private readonly bankAccountsService: BankAccountsService) {}

	@Post()
	@ApiBearerAuth()
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
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Admin)
	@ApiBearerAuth()
	@ApiBody({ type: CreateBankAccountDto })
	update(
		@Param("id") id: string,
		@Body() updateBankAccountDto: UpdateBankAccountDto,
	) {
		return this.bankAccountsService.update(id, updateBankAccountDto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Admin)
	@ApiBearerAuth()
	remove(@Param("id") id: string) {
		return this.bankAccountsService.remove(id);
	}
}
