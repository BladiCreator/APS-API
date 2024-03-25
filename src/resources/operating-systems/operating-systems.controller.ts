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
import { UserRole } from "@src/common/enums/user-roles.enum";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { CreateOperatingSystemDto } from "./dto/create-operating-system.dto";
import { UpdateOperatingSystemDto } from "./dto/update-operating-system.dto";
import { OperatingSystemsService } from "./operating-systems.service";

@Controller("operating-systems")
@ApiTags("Operating Systems")
export class OperatingSystemsController {
	constructor(
		private readonly operatingSystemsService: OperatingSystemsService,
	) {}

	@Post()
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@ApiBody({ type: CreateOperatingSystemDto })
	create(@Body() createOperatingSystemDto: CreateOperatingSystemDto) {
		return this.operatingSystemsService.create(createOperatingSystemDto);
	}

	@Get()
	findAll() {
		return this.operatingSystemsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.operatingSystemsService.findOne(id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateOperatingSystemDto })
	update(
		@Param("id") id: string,
		@Body() updateOperatingSystemDto: UpdateOperatingSystemDto,
	) {
		return this.operatingSystemsService.update(id, updateOperatingSystemDto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	remove(@Param("id") id: string) {
		return this.operatingSystemsService.remove(id);
	}
}
