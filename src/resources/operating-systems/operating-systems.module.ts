import { Module } from "@nestjs/common";
import { OperatingSystemsService } from "./operating-systems.service";
import { OperatingSystemsController } from "./operating-systems.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OperatingSystem } from "./entities/operating-system.entity";

@Module({
	imports: [TypeOrmModule.forFeature([OperatingSystem])],
	controllers: [OperatingSystemsController],
	providers: [OperatingSystemsService],
})
export class OperatingSystemsModule {}
