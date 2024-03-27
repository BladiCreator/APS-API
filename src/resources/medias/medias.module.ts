import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { MediasController } from "./medias.controller";
import { MediasService } from "./medias.service";
import { FastifyMulterModule } from "@nest-lab/fastify-multer";

@Module({
	imports: [TypeOrmModule.forFeature([Media]), FastifyMulterModule],
	controllers: [MediasController],
	providers: [MediasService],
})
export class MediasModule {}
