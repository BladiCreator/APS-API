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

import { CompaniesService } from "./companies.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { AuthGuard } from "@src/auth/auth.guard";

//! Solo puede hacer modificaciones el usuario con Developer
@Controller("companies")
export class CompaniesController {
	constructor(private readonly companiesService: CompaniesService) {}

	@Post()
	@UseGuards(AuthGuard)
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
	@UseGuards(AuthGuard)
	update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
		return this.companiesService.update(id, updateCompanyDto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard)
	remove(@Param("id") id: string) {
		return this.companiesService.remove(id);
	}
}
