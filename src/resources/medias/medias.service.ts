import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./entities/media.entity";
import { File } from "@nest-lab/fastify-multer";
import { ConfigService } from "@nestjs/config";
import { CreateMediasDto } from "./dto/create-medias.dto";
import path from "path";
import { promises as fs } from "fs";

@Injectable()
export class MediasService {
	upload_location_images;
	upload_location_apps;

	constructor(
		@InjectRepository(Media)
		private readonly mediaRepository: Repository<Media>,
		private readonly configService: ConfigService,
		@Inject(Logger) private readonly logger: Logger,
	) {
		const getLocationConfig = (key: string) => {
			return this.configService.getOrThrow<string>(key).replace("./", "");
		};

		this.upload_location_images = getLocationConfig("UPLOAD_LOCATION_IMAGES");
		this.upload_location_apps = getLocationConfig("UPLOAD_LOCATION_APPS");
	}

	async findAll() {
		return await this.mediaRepository.find();
	}

	async findOne(id: string) {
		const media = await this.mediaRepository.findOneBy({ id: id });

		if (!media) {
			throw new NotFoundException("Media does not exist!");
		}

		return media;
	}

	async update(id: string, updateMediaDto: UpdateMediaDto) {
		return await this.mediaRepository.save({ id: id, ...updateMediaDto });
	}

	async remove(id: string) {
		const media = await this.findOne(id);

		if (!media) {
			throw new NotFoundException("Media does not exist!");
		}

		await this.deleteFile(media.url);

		return await this.mediaRepository.remove(media);
	}

	//TODO: devolver la url para poder acceder al archivo
	// async saveFile(request: FastifyRequest, file: File) {
	// 	console.log(file);
	// 	console.log(`/image/${file.filename}`);
	// }

	// async saveFiles(files: Array<File>) {
	// 	console.log(files);
	// }

	async createImage(createMediaDto: CreateMediaDto, fileImage: File) {
		createMediaDto.url = `${this.upload_location_images}/${fileImage.filename}`;
		return await this.mediaRepository.save(createMediaDto);
	}

	async createImages(
		createMediasDto: CreateMediasDto,
		filesImage: Array<File>,
	) {
		const createMediaDtoList: CreateMediaDto[] = createMediasDto.alt.map(
			(alt, index) => {
				return new CreateMediaDto(
					`${this.upload_location_images}/${filesImage[index].filename}`,
					alt,
				);
			},
		);
		return await this.mediaRepository.save(createMediaDtoList);
	}

	private async deleteFile(url: string) {
		const filePath = path.join(__dirname, "../../../", url);
		try {
			await fs.unlink(filePath);
			this.logger.log(`File ${filePath.split("\\").at(-1)} deleted successfully`);
		} catch (err) {
			this.logger.error(`Error deleting file ${filePath}`, err);
			throw err;
		}
	}
}
