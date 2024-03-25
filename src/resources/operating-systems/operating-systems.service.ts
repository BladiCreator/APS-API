import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOperatingSystemDto } from "./dto/create-operating-system.dto";
import { UpdateOperatingSystemDto } from "./dto/update-operating-system.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { OperatingSystem } from "./entities/operating-system.entity";
import { Repository } from "typeorm";

@Injectable()
export class OperatingSystemsService {
	constructor(
		@InjectRepository(OperatingSystem)
		private readonly operatingSystemRepository: Repository<OperatingSystem>,
	) {}

	async create(createOperatingSystemDto: CreateOperatingSystemDto) {
		return await this.operatingSystemRepository.save(createOperatingSystemDto);
	}

	async findAll() {
		return await this.operatingSystemRepository.find();
	}

	async findOne(id: string) {
		const operatingSystem = await this.operatingSystemRepository.findOneBy({
			id: id,
		});

		if (!operatingSystem) {
			throw new NotFoundException("Operating System not found");
		}

		return operatingSystem;
	}

	async update(id: string, updateOperatingSystemDto: UpdateOperatingSystemDto) {
		return await this.operatingSystemRepository.save({
			id: id,
			...updateOperatingSystemDto,
		});
	}

	async remove(id: string) {
		const operatingSystem = await this.findOne(id);

		return await this.operatingSystemRepository.remove(operatingSystem);
	}
}
