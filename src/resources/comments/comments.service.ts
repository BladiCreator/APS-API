import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentsService {
	constructor(
		@InjectRepository(Comment)
		private readonly commentRepository: Repository<Comment>,
	) {}

	async create(createCommentDto: CreateCommentDto): Promise<Comment> {
		return await this.commentRepository.save(createCommentDto);
	}

	async findAll(): Promise<Comment[]> {
		return await this.commentRepository.find();
	}

	async findOne(id: string): Promise<Comment | null> {
		return await this.commentRepository.findOneBy({ id });
	}

	async update(
		id: string,
		updateCommentDto: UpdateCommentDto,
	): Promise<Comment> {
		return await this.commentRepository.save({ id: id, ...updateCommentDto });
	}

	async remove(id: string) {
		const comment = await this.findOne(id);

		if (!comment) {
			throw new NotFoundException("Comment does not exist!");
		}

		return await this.commentRepository.remove(comment);
	}
}
