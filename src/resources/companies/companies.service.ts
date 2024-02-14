import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companyRepository.save(createCompanyDto);
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: string): Promise<Company | null> {
    return this.companyRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    return this.companyRepository.save({
      id: id,
      updateCompanyDto: updateCompanyDto,
    });
  }

  async remove(id: string) {
    const company = await this.findOne(id);

    if (!company) {
      throw new NotFoundException(`Company does not exist!`);
    }

    return await this.companyRepository.remove(company);
  }
}
