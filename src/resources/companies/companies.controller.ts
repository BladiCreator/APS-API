import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";

import { UserRoles } from "@src/auth/decorators/roles.decorator";
import { AuthGuard } from "@src/auth/guards/auth.guard";
import { RolesGuard } from "@src/auth/guards/roles.guard";
import { UserRole } from "@src/core/enums/user-roles.enum";
import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { FindCompanyDto } from "./dto/find-company.dto";

//! Solo puede hacer modificaciones el usuario con Developer
@Controller("companies")
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Post()
	@UserRoles(UserRole.Developer)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createCompanyDto: CreateCompanyDto) {
		return this.companiesService.create(createCompanyDto);
	}

	@Get()
	findAll(@Query() findCompanyDto: FindCompanyDto) {
		return this.companiesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.companiesService.findOne(id);
	}

	@Patch(":id")
	@UserRoles(UserRole.Developer)
	@UseGuards(AuthGuard, RolesGuard)
	update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
		return this.companiesService.update(id, updateCompanyDto);
	}

	@Delete(":id")
	@UserRoles(UserRole.Developer)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param("id") id: string) {
		return this.companiesService.remove(id);
	}
}
