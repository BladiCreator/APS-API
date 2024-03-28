import { promises as fs } from "fs";
import path from "path";
import { File } from "@nest-lab/fastify-multer";
import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMediaDto } from "./dto/create-media.dto";
import { CreateMediasDto } from "./dto/create-medias.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { Media } from "./entities/media.entity";

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

	async createFile(createMediaDto: CreateMediaDto, file: File) {
		createMediaDto.url = `${this.getUploadLocation(file)}/${file.filename}`;
		return await this.mediaRepository.save(createMediaDto);
	}

	async createFiles(createMediasDto: CreateMediasDto, files: Array<File>) {
		const createMediaDtoList: CreateMediaDto[] = createMediasDto.alt.map(
			(alt, index) => {
				return new CreateMediaDto(
					`${this.getUploadLocation(files[index])}/${files[index].filename}`,
					alt,
				);
			},
		);
		return await this.mediaRepository.save(createMediaDtoList);
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

	async updateFile(id: string, updateMediaDto: UpdateMediaDto, file?: File) {
		const media = await this.findOne(id);

		if (!media) {
			throw new NotFoundException("Media does not exist!");
		}

		if (file) {
			await this.deleteFile(media.url);
			updateMediaDto.url = `${this.getUploadLocation(file)}/${file.filename}`;
		}

		return await this.mediaRepository.save({ id: id, ...updateMediaDto });
	}

	async removeFile(id: string) {
		const media = await this.findOne(id);

		if (!media) {
			throw new NotFoundException("Media does not exist!");
		}

		await this.deleteFile(media.url);

		return await this.mediaRepository.remove(media);
	}

	//*** PRIVATE METHODS ****/

	private async deleteFile(url: string) {
		const filePath = path.join(__dirname, "../../../", url);
		try {
			await fs.unlink(filePath);
			this.logger.log(
				`File ${filePath.split("\\").at(-1)} deleted successfully`,
			);
		} catch (err) {
			this.logger.error(`Error deleting file ${filePath}`, err);
			throw err;
		}
	}

	private getUploadLocation(file: File) {
		const newLocation = file.mimetype.includes("image/")
			? this.upload_location_images
			: this.upload_location_apps;
		return `${newLocation}/${file.filename}`;
	}
}
