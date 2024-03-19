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
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserRoles } from "@src/common/decorators/roles.decorator";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { CreateFeedbackDto } from "./dto/create-feedback.dto";
import { UpdateFeedbackDto } from "./dto/update-feedback.dto";
import { FeedbacksService } from "./feedbacks.service";

@ApiTags("Feedbacks")
@Controller("feedbacks")
export class FeedbacksController {
	constructor(private readonly feedbacksService: FeedbacksService) {}

	@ApiBearerAuth()
	@Post()
	@UserRoles(UserRole.User, UserRole.Developer, UserRole.Admin)
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
	@UserRoles(UserRole.User, UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	update(
		@Param("id") id: string,
		@Body() updateFeedbackDto: UpdateFeedbackDto,
	) {
		return this.feedbacksService.update(id, updateFeedbackDto);
	}

	@ApiBearerAuth()
	@Delete(":id")
	@UserRoles(UserRole.User, UserRole.Developer, UserRole.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	remove(@Param("id") id: string) {
		return this.feedbacksService.remove(id);
	}
}
