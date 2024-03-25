import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OperatingSystem } from "./entities/operating-system.entity";
import { OperatingSystemsController } from "./operating-systems.controller";
import { OperatingSystemsService } from "./operating-systems.service";

@Module({
	imports: [TypeOrmModule.forFeature([OperatingSystem])],
	controllers: [OperatingSystemsController],
	providers: [OperatingSystemsService],
})
export class OperatingSystemsModule {}
