import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserConfiguration } from "./entities/user-configuration.entity";
import { UserConfigurationsController } from "./user-configurations.controller";
import { UserConfigurationsService } from "./user-configurations.service";

@Module({
	imports: [TypeOrmModule.forFeature([UserConfiguration])],
	controllers: [UserConfigurationsController],
	providers: [UserConfigurationsService],
})
export class UserConfigurationsModule {}
