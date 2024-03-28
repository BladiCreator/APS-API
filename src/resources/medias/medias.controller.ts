import {
	File,
	FileInterceptor,
	FilesInterceptor,
} from "@nest-lab/fastify-multer";
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
	ApiBodyOptions,
	ApiConsumes,
	ApiOperation,
	ApiTags,
} from "@nestjs/swagger";
import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";
import { UserRoles } from "@src/common/decorators/roles.decorator";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { multerConfigs } from "@src/config/multer.config";
import { CreateMediaDto } from "./dto/create-media.dto";
import { CreateMediasDto } from "./dto/create-medias.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { MediasService } from "./medias.service";

const apiBodyOptionsFile: ApiBodyOptions = {
	required: true,
	schema: {
		type: "object",
		properties: {
			file: {
				type: "string",
				description: "File to upload",
				format: "binary",
			},
			alt: {
				type: "string",
				description: "Alternative text for the media",
			},
		},
	},
};

const apiBodyOptionsFiles: ApiBodyOptions = {
	required: true,
	schema: {
		type: "object",
		properties: {
			...(apiBodyOptionsFile.schema as SchemaObject).properties,
			alt: {
				type: "array",
				description: "Alternative text for the media",
				items: {
					type: "string",
				},
			},
		},
	},
};

@Controller("medias")
@ApiTags("Medias")
export class MediasController {
	constructor(private readonly mediasService: MediasService) {}

	@Post("/image")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor("file", multerConfigs.images))
	@ApiOperation({ summary: "Upload a single image" })
	@ApiConsumes("multipart/form-data")
	@ApiBody(apiBodyOptionsFile)
	singleFileImage(
		@Body() createMediaDto: CreateMediaDto,
		@UploadedFile() fileImage: File,
	) {
		return this.mediasService.createFile(createMediaDto, fileImage);
	}

	@Post("/images")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@UseInterceptors(FilesInterceptor("files", 6, multerConfigs.images)) //* max 6 files
	@ApiConsumes("multipart/form-data")
	@ApiOperation({ summary: "Uploads multiple images" })
	@ApiBody(apiBodyOptionsFiles)
	multipleFilesImage(
		@Body() createMediasDto: CreateMediasDto,
		@UploadedFiles() filesImage: Array<File>,
	) {
		return this.mediasService.createFiles(createMediasDto, filesImage);
	}

	@Post("/file")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor("file", multerConfigs.apps))
	@ApiOperation({ summary: "Upload a single file" })
	@ApiConsumes("multipart/form-data")
	@ApiBody(apiBodyOptionsFile)
	singleFile(
		@Body() createMediaDto: CreateMediaDto,
		@UploadedFile() file: File,
	) {
		return this.mediasService.createFile(createMediaDto, file);
	}

	@Post("/files")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@UseInterceptors(FilesInterceptor("files", 6, multerConfigs.apps)) //* max 6 files
	@ApiConsumes("multipart/form-data")
	@ApiOperation({ summary: "Uploads multiple files" })
	@ApiBody(apiBodyOptionsFiles)
	multipleFiles(
		@Body() createMediasDto: CreateMediasDto,
		@UploadedFiles() files: Array<File>,
	) {
		return this.mediasService.createFiles(createMediasDto, files);
	}

	@Get()
	findAll() {
		return this.mediasService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.mediasService.findOne(id);
	}

	@Patch("/image/:id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor("file", multerConfigs.images))
	@ApiOperation({ summary: "Updates a single image" })
	@ApiConsumes("multipart/form-data")
	@ApiBody(apiBodyOptionsFile)
	updateImage(
		@Param("id") id: string,
		@Body() updateMediaDto: UpdateMediaDto,
		@UploadedFile() fileImage: File,
	) {
		return this.mediasService.updateFile(id, updateMediaDto, fileImage);
	}

	@Patch("/file/:id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	@UseInterceptors(FileInterceptor("file", multerConfigs.apps))
	@ApiOperation({ summary: "Updates a single file" })
	@ApiConsumes("multipart/form-data")
	@ApiBody(apiBodyOptionsFile)
	updateFile(
		@Param("id") id: string,
		@Body() updateMediaDto: UpdateMediaDto,
		@UploadedFile() fileImage: File,
	) {
		return this.mediasService.updateFile(id, updateMediaDto, fileImage);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Developer, UserRole.Admin)
	@ApiBearerAuth()
	remove(@Param("id") id: string) {
		return this.mediasService.removeFile(id);
	}
}
