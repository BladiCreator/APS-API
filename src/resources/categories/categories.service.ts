import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) {}

	async create(createCategoryDto: CreateCategoryDto) {
		return await this.categoryRepository.save(createCategoryDto);
	}

	async findAll(): Promise<Category[]> {
		return await this.categoryRepository.find();
	}

	async findOne(id: number): Promise<Category | null> {
		return await this.categoryRepository.findOneBy({ id });
	}

	async update(
		id: number,
		updateCategoryDto: UpdateCategoryDto,
	): Promise<Category> {
		return await this.categoryRepository.save({ id: id, ...updateCategoryDto });
	}

	async remove(id: number): Promise<Category> {
		const category = await this.findOne(id);

		if (!category) {
			throw new NotFoundException("Category does not exist!");
		}

		return await this.categoryRepository.remove(category);
	}
}
