import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	UseGuards,
} from "@nestjs/common";

import { UserRoles } from "@src/auth/decorators/roles.decorator";
import { AuthGuard } from "@src/auth/guards/auth.guard";
import { RolesGuard } from "@src/auth/guards/roles.guard";
import { UserRole } from "@src/core/enums/user-roles.enum";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersService } from "./users.service";

@Controller("users")
@UseGuards(AuthGuard, RolesGuard)
@UserRoles(UserRole.Admin, UserRole.Developer, UserRole.User)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	// @Get()
	// findAll() {
	//   return this.usersService.findAll();
	// }

	// @Get(":id")
	// findOne(@Param("id") id: string) {
	//   return this.usersService.findOne(id);
	// }
	
	//Solo puede acceder a la información el usuario que ya se halla autorizado
	@Get(":email")
	findOne(@Param("email") email: string) {
	  return this.usersService.finOneByEmail(email);
	}
	
	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(id);
	}
}
