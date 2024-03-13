import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { Feedback } from "./entities/feedback.entity";

@Injectable()
export class FeedbacksService {
	constructor(
		@InjectRepository(Feedback)
		private readonly feedbackRepository: Repository<Feedback>,
	) {}

	async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
		return await this.feedbackRepository.save(createFeedbackDto);
	}

	async findAll(): Promise<Feedback[]> {
		return await this.feedbackRepository.find();
	}

	async findOne(id: string): Promise<Feedback | null> {
		return await this.feedbackRepository.findOneBy({ id });
	}

	async update(
		id: string,
		updateFeedbackDto: UpdateFeedbackDto,
	): Promise<Feedback> {
		return await this.feedbackRepository.save({ id: id, ...updateFeedbackDto });
	}

	async remove(id: string) {
		const feedback = await this.findOne(id);

		if (!feedback) {
			throw new NotFoundException("Feedback does not exist!");
		}

		return await this.feedbackRepository.remove(feedback);
	}
}
