import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateApplicationDto } from "./dto/create-application.dto";
import { UpdateApplicationDto } from "./dto/update-application.dto";
import { Application } from "./entities/application.entity";

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const application = this.applicationRepository.create(createApplicationDto);
    return await this.applicationRepository.save(application);
  }

  async findAll() {
    return await this.applicationRepository.find();
  }

  async findOne(id: string) {
    return await this.applicationRepository.findOneBy({ id });
  }

  async update(id: string, updateApplicationDto: UpdateApplicationDto) {
    return await this.applicationRepository.update(id, updateApplicationDto);
  }

  async remove(id: string) {
    return await this.applicationRepository.softDelete(id);
  }
}
