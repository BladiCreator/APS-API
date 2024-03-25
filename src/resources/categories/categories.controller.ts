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

import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { UserRoles } from "@src/common/decorators/roles.decorator";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { RolesGuard } from "@src/common/guards/roles.guard";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@ApiTags("Categories")
@Controller("categories")
export class CategoriesController {
	constructor(private readonly categoriesService: CategoriesService) {}

	@Post()
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Admin)
	@ApiBearerAuth()
	@ApiBody({ type: CreateCategoryDto })
	create(@Body() createCategoryDto: CreateCategoryDto) {
		return this.categoriesService.create(createCategoryDto);
	}

	@Get()
	findAll() {
		return this.categoriesService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.categoriesService.findOne(+id);
	}

	@Patch(":id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Admin)
	@ApiBearerAuth()
	@ApiBody({ type: UpdateCategoryDto })
	update(
		@Param("id") id: string,
		@Body() updateCategoryDto: UpdateCategoryDto,
	) {
		return this.categoriesService.update(+id, updateCategoryDto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, RolesGuard)
	@UserRoles(UserRole.Admin)
	@ApiBearerAuth()
	remove(@Param("id") id: string) {
		return this.categoriesService.remove(+id);
	}
}
