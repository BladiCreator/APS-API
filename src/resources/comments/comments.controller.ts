import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";

import { UserRoles } from "@src/auth/decorators/roles.decorator";
import { AuthGuard } from "@src/auth/guards/auth.guard";
import { RolesGuard } from "@src/auth/guards/roles.guard";
import { UserRole } from "@src/enums/user-roles.enum";
import { CommentsService } from "./comments.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comments")
@UserRoles(UserRole.User)
export class CommentsController {
	constructor(private readonly commentsService: CommentsService) {}

	@Post()
	@UserRoles(UserRole.User)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentsService.create(createCommentDto);
	}

	@Get()
	findAll() {
		return this.commentsService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.commentsService.findOne(id);
	}

	@Patch(":id")
	@UserRoles(UserRole.User)
	@UseGuards(AuthGuard, RolesGuard)
	update(@Param("id") id: string, @Body() updateCommentDto: UpdateCommentDto) {
		return this.commentsService.update(id, updateCommentDto);
	}

	@Delete(":id")
	@UserRoles(UserRole.User)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param("id") id: string) {
		return this.commentsService.remove(id);
	}
}
