import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMediaDto } from "./dto/create-media.dto";
import { UpdateMediaDto } from "./dto/update-media.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Media } from "./entities/media.entity";
import { Repository } from "typeorm";

@Injectable()
export class MediasService {
	constructor(
		@InjectRepository(Media)
		private readonly mediaRepository: Repository<Media>,
	) {}

	async create(createMediaDto: CreateMediaDto) {
		return await this.mediaRepository.save(createMediaDto);
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

		return await this.mediaRepository.remove(media);
	}
}
