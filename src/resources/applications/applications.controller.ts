import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
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
import { ApplicationsService } from "./applications.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { FindApplicationDto } from "./dto/find-application.dto";

@Controller("applications")
export class ApplicationsController {
	constructor(private readonly applicationsService: ApplicationsService) {}

	@Post()
	@HttpCode(201)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createApplicationDto: CreateApplicationDto) {
		return this.applicationsService.create(createApplicationDto);
	}

	@Get()
	findAll(@Query() findApplicationDto: FindApplicationDto) {
		if (Object.keys(findApplicationDto).length > 0) {
			return this.applicationsService.findByDto(findApplicationDto);
		}
		return this.applicationsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.applicationsService.findOne(id);
	}

	@Patch(":id")
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param("id") id: string,
		@Body() updateApplicationDto: UpdateApplicationDto,
	) {
		return this.applicationsService.update(id, updateApplicationDto);
	}

	@Delete(":id")
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param("id") id: string) {
		return this.applicationsService.remove(id);
	}

	//TODO: Get by min max price
	//TODO: Get by name
	//TODO: Get by has discount
	//TODO: Get by categories
}
