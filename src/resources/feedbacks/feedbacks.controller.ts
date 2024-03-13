import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
} from "@nestjs/common";
import { FeedbacksService } from "./feedbacks.service";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRoles } from "@src/auth/decorators/roles.decorator";
import { UserRole } from "@src/core/enums/user-roles.enum";
import { AuthGuard } from "@src/auth/guards/auth.guard";
import { RolesGuard } from "@src/auth/guards/roles.guard";

@ApiTags("Feedbacks")
@Controller("feedbacks")
export class FeedbacksController {
	constructor(private readonly feedbacksService: FeedbacksService) {}

	@ApiBearerAuth()
	@Post()
	@UserRoles(UserRole.User)
	@UseGuards(AuthGuard, RolesGuard)
	create(@Body() createFeedbackDto: CreateFeedbackDto) {
		return this.feedbacksService.create(createFeedbackDto);
	}

	@Get()
	findAll() {
		return this.feedbacksService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.feedbacksService.findOne(id);
	}

	@ApiBearerAuth()
	@Patch(":id")
	@UserRoles(UserRole.User)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param("id") id: string,
		@Body() updateFeedbackDto: UpdateFeedbackDto,
	) {
		return this.feedbacksService.update(id, updateFeedbackDto);
	}

	@ApiBearerAuth()
	@Delete(":id")
	@UserRoles(UserRole.User)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param("id") id: string) {
		return this.feedbacksService.remove(id);
	}
}
