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
import { UserConfigurationsService } from "./user-configurations.service";
import { CreateUserConfigurationDto } from "./dto/create-user-configuration.dto";
import { UpdateUserConfigurationDto } from "./dto/update-user-configuration.dto";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

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
