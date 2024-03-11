import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";
import { applicationMinimalSelect } from "@src/core/constants/minimal-select.constant";

@Injectable()
export class CompaniesService {
	constructor(
		@InjectRepository(Company)
		private readonly companyRepository: Repository<Company>,
	) {}

	async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
		return await this.companyRepository.save(createCompanyDto);
	}

	async findAll(): Promise<Company[]> {
		return await this.companyRepository.find({
			select: {
				id: true,
				name: true,
				description: false,
			},
		});
	}

	async findOne(id: string): Promise<Company | null> {
		return await this.companyRepository.findOne({
			where: { id: id },
			select: {
				id: true,
				name: true,
				description: true,
				applications: applicationMinimalSelect,
			},
			relations: {
				applications: true,
			},
		});
	}

	async update(
		id: string,
		updateCompanyDto: UpdateCompanyDto,
	): Promise<Company> {
		return await this.companyRepository.save({
			id: id,
			updateCompanyDto: updateCompanyDto,
		});
	}

	async remove(id: string) {
		const company = await this.findOne(id);

		if (!company) {
			throw new NotFoundException("Company does not exist!");
		}

		return await this.companyRepository.remove(company);
	}

	// async findByDto(findCompanyDto: FindCompanyDto): Promise<Company[]> {
	// 	const criteria: FindOptionsWhere<Company> | FindOptionsWhere<Company>[] = {
	// 		...(findCompanyDto.name ? { name: findCompanyDto.name } : {}),
	// 		...(findCompanyDto.search
	// 			? { name: Like(`${findCompanyDto.search}%`) }
	// 			: {}),
	// 	};
	// 	return await this.companyRepository.find({
	// 		where: criteria,
	// 		order: { name: findCompanyDto.order },
	// 		take: findCompanyDto.limit,
	// 		skip: findCompanyDto.offset,
	// 	});
	// }
}
