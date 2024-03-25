import { PartialType } from "@nestjs/swagger";
import { CreateUserConfigurationDto } from "./create-user-configuration.dto";

export class UpdateUserConfigurationDto extends PartialType(
	CreateUserConfigurationDto,
) {}
