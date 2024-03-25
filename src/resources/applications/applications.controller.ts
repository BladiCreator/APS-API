import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Inject,
	Logger,
	Param,
	Patch,
	Post,
	Query,
	UseGuards,
} from "@nestjs/common";

import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { UserRoles } from "@src/common/decorators/roles.decorator";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { ApplicationsService } from "./applications.service";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { FindApplicationDto } from "./dto/find-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";

@ApiTags("Applications")
@Controller("applications")
export class ApplicationsController {
	constructor(
		@Inject(Logger) private readonly logger: Logger,
		private readonly applicationsService: ApplicationsService,
	) {}

	@ApiBearerAuth()
	@ApiBody({ type: [CreateApplicationDto] })
	@Post()
	@HttpCode(201)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createApplicationDto: CreateApplicationDto) {
		this.logger.log(createApplicationDto);
		return this.applicationsService.create(createApplicationDto);
	}

	@Get()
	findAll(@Query() findApplicationDto: FindApplicationDto) {
		if (Object.keys(findApplicationDto).length > 0) {
			this.logger.log("Getting all applications by query");
			return this.applicationsService.findByDto(findApplicationDto);
		}
		this.logger.log("Getting all applications");
		return this.applicationsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.applicationsService.findOne(id);
	}

	@ApiBearerAuth()
	@ApiBody({ type: [CreateApplicationDto] })
	@Patch(":id")
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param("id") id: string,
		@Body() updateApplicationDto: UpdateApplicationDto,
	) {
		return this.applicationsService.update(id, updateApplicationDto);
	}

	@ApiBearerAuth()
	@Delete(":id")
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param("id") id: string) {
		return this.applicationsService.remove(id);
	}
}
