import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UploadedFile,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiBody,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { MediasService } from "./medias.service";
import {
	File,
	FileInterceptor,
	FilesInterceptor,
} from "@nest-lab/fastify-multer";
import { multerConfigs } from "@src/config/multer.config";
import { CreateMediasDto } from "./dto/create-medias.dto";

@Controller("medias")
@ApiTags("Medias")
export class MediasController {
	constructor(private readonly mediasService: MediasService) {}

	@Post("/image")
	@UseGuards(AuthGuard)
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor("file", multerConfigs.images))
	@ApiOperation({ summary: "Uploads a single file" })
	@ApiConsumes("multipart/form-data")
	@ApiBody({
		required: true,
		schema: {
			type: "object",
			properties: {
				file: {
					type: "string",
					description: "Image to upload",
					format: "binary",
				},
				alt: {
					type: "string",
					description: "Alternative text for the media",
				},
			},
		},
	})
	singleFileImage(
		@Body() createMediaDto: CreateMediaDto,
		@UploadedFile() fileImage: File,
	) {
		return this.mediasService.createImage(createMediaDto, fileImage);
	}

	@Post("/images")
	@UseInterceptors(FilesInterceptor("files", 6, multerConfigs.images)) //* max 6 files
	@ApiConsumes("multipart/form-data")
	@ApiOperation({ summary: "Uploads multiple files" })
	@ApiBody({
		required: true,
		schema: {
			type: "object",
			properties: {
				files: {
					type: "array",
					description: "Images to upload",
					items: {
						type: "string",
						format: "binary",
					},
				},
				alt: {
					type: "array",
					description: "Alternative text for the media",
					items: {
						type: "string",
					},
				}
			},
		},
	})
	multipleFilesImage(
		@Body() createMediasDto: CreateMediasDto,
		@UploadedFiles() filesImage: Array<File>,
	) {
		return this.mediasService.createImages(createMediasDto, filesImage);
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
