import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
	Between,
	FindOptionsSelect,
	FindOptionsWhere,
	ILike,
	In,
	LessThanOrEqual,
	MoreThanOrEqual,
	Or,
	Repository,
} from "typeorm";

import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { Application } from "./entities/application.entity";
import { FindApplicationDto } from "./dto/find-application.dto";
import { applicationMinimalSelect } from "@src/core/constants/minimal-select.constant";

@Injectable()
export class ApplicationsService {
	private applicationMinimalSelect: FindOptionsSelect<Application> =
		applicationMinimalSelect;

	constructor(
		@InjectRepository(Application)
		private readonly applicationRepository: Repository<Application>,
	) {}

	async create(createApplicationDto: CreateApplicationDto) {
		return await this.applicationRepository.save(createApplicationDto);
	}

	async findAll(): Promise<Application[]> {
		return await this.applicationRepository.find({
			select: this.applicationMinimalSelect,
			relations: {
				categories: true,
			},
		});
	}

	async findOne(id: string): Promise<Application | null> {
		return await this.applicationRepository.findOne({
			where: { id: id },
			relations: {
				categories: true,
				comments: true,
			},
		});
	}

	async update(
		id: string,
		updateApplicationDto: UpdateApplicationDto,
	): Promise<Application> {
		return await this.applicationRepository.save({
			id: id,
			...updateApplicationDto,
		});
	}

	async remove(id: string): Promise<Application> {
		const application = await this.findOne(id);

		if (!application) {
			throw new NotFoundException("Application does not exist!");
		}

		return await this.applicationRepository.remove(application);
	}

	async findByDto(
		findApplicationDto: FindApplicationDto,
	): Promise<Application[]> {
		const criteria:
			| FindOptionsWhere<Application>
			| FindOptionsWhere<Application>[] = {
			...(findApplicationDto.name ? { name: findApplicationDto.name } : {}),
			...(findApplicationDto.search
				? { name: ILike(`%${findApplicationDto.search}%`) }
				: {}),
			...(findApplicationDto.min_price
				? { price: MoreThanOrEqual(findApplicationDto.min_price) }
				: {}),
			...(findApplicationDto.max_price
				? { price: LessThanOrEqual(findApplicationDto.max_price) }
				: {}),
			...(findApplicationDto.discount
				? { discount: findApplicationDto.discount }
				: {}),
			...(findApplicationDto.min_price && findApplicationDto.max_price
				? {
						price: Between(
							findApplicationDto.min_price,
							findApplicationDto.max_price,
						),
				  }
				: {}),

			...(findApplicationDto.categories
				? {
						categories: {
							name: Or(
								ILike(`%${findApplicationDto.categories}%`),
								In(findApplicationDto.categories.split(",")),
							),
						},
				  }
				: {}),
		};

		const applications = await this.applicationRepository.find({
			select: this.applicationMinimalSelect,
			where: criteria,
			order: {
				name: findApplicationDto.order,
			},
			take: findApplicationDto.limit,
			skip: findApplicationDto.offset,
			relations: {
				categories: true,
			},
		});

		if (findApplicationDto.same_categories && findApplicationDto.categories && findApplicationDto.categories.split(",").length > 1) {
			return applications.filter((application) =>
				areArraysEqual<string>(
					application.categories.map((category) => category.name),
					findApplicationDto.categories!.split(","),
				),
			);
		}

		return applications;
	}
}

function areArraysEqual<T>(arr1: T[], arr2: T[]): boolean {
	if((arr1.length > 1 && arr2.length > 1) && arr1.every(item => arr2.includes(item))){
		return true;
	}
	
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}

	return true;
}
