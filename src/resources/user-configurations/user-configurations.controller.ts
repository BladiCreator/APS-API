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
import { CreateUserConfigurationDto } from "./dto/create-user-configuration.dto";
import { UpdateUserConfigurationDto } from "./dto/update-user-configuration.dto";
import { UserConfigurationsService } from "./user-configurations.service";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("User Configurations")
@Controller("user-configurations")
export class UserConfigurationsController {
	constructor(
		private readonly userConfigurationsService: UserConfigurationsService,
	) {}

	@Post()

	@ApiBody({ type: CreateUserConfigurationDto })
	create(@Body() createUserConfigurationDto: CreateUserConfigurationDto) {
		return this.userConfigurationsService.create(createUserConfigurationDto);
	}

	@Get()
	findAll() {
		return this.userConfigurationsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.userConfigurationsService.findOne(id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateUserConfigurationDto: UpdateUserConfigurationDto,
	) {
		return this.userConfigurationsService.update(
			id,
			updateUserConfigurationDto,
		);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.userConfigurationsService.remove(id);
	}
}
