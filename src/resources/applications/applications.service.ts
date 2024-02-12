import { Injectable, NotFoundException } from "@nestjs/common";
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

  async findAll(): Promise<Application[]> {
    return await this.applicationRepository.find();
  }

  async findOne(id: string): Promise<Application | null> {
    return await this.applicationRepository.findOneBy({ id });
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
      throw new NotFoundException(`Application does not exist!`);
    }

    await this.applicationRepository.delete(id);
    return application;
  }
}
