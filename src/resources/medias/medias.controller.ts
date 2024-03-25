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
import { MediasService } from "./medias.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";

@Controller("medias")
@ApiTags("Medias")
export class MediasController {
	constructor(private readonly mediasService: MediasService) {}

	@Post()
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@ApiBody({ type: CreateMediaDto })
	create(@Body() createMediaDto: CreateMediaDto) {
		return this.mediasService.create(createMediaDto);
	}

	@Get()
	findAll() {
		return this.mediasService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.mediasService.findOne(id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateMediaDto })
	update(@Param("id") id: string, @Body() updateMediaDto: UpdateMediaDto) {
		return this.mediasService.update(id, updateMediaDto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	remove(@Param("id") id: string) {
		return this.mediasService.remove(id);
	}
}
