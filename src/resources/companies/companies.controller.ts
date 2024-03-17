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
import { UserRoles } from "@src/common/decorators/roles.decorator";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@ApiTags("Companies")
@Controller("companies")
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Post()
	@UserRoles(UserRole.Developer)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiBearerAuth()
	@ApiBody({ type: CreateCompanyDto })
	create(@Body() createCompanyDto: CreateCompanyDto) {
		return this.companiesService.create(createCompanyDto);
	}

	@Get()
	findAll() {
		return this.companiesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.companiesService.findOne(id);
	}

	@Patch(":id")
	@UserRoles(UserRole.Developer)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiBearerAuth()
	update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
		return this.companiesService.update(id, updateCompanyDto);
	}

	@Delete(":id")
	@UserRoles(UserRole.Developer)
	@UseGuards(AuthGuard, RolesGuard)
	@ApiBearerAuth()
	remove(@Param("id") id: string) {
		return this.companiesService.remove(id);
	}
}
