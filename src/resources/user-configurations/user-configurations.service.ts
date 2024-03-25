import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserConfigurationDto } from "./dto/create-user-configuration.dto";
import { UpdateUserConfigurationDto } from "./dto/update-user-configuration.dto";
import { UserConfiguration } from "./entities/user-configuration.entity";

@Injectable()
export class UserConfigurationsService {
	constructor(
		@InjectRepository(UserConfiguration)
		private readonly userConfigurationRepository: Repository<UserConfiguration>,
	) {}

	async create(createUserConfigurationDto: CreateUserConfigurationDto) {
		return await this.userConfigurationRepository.save(
			createUserConfigurationDto,
		);
	}

	async findAll() {
		return await this.userConfigurationRepository.find();
	}

	async findOne(id: string) {
		const userConfiguration = await this.userConfigurationRepository.findOneBy({
			id,
		});

		if (!userConfiguration) {
			throw new NotFoundException("User configuration does not exist");
		}

		return userConfiguration;
	}

	async update(
		id: string,
		updateUserConfigurationDto: UpdateUserConfigurationDto,
	) {
		return await this.userConfigurationRepository.save({
			id,
			...updateUserConfigurationDto,
		});
	}

	async remove(id: string) {
		const userConfiguration = await this.findOne(id);

		return await this.userConfigurationRepository.remove(userConfiguration);
	}
}
