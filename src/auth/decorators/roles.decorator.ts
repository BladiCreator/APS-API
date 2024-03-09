import { SetMetadata } from "@nestjs/common";
import { UserRole } from "@src/core/enums/user-roles.enum";

export const USER_ROLES_KEY = "user-roles";
export const UserRoles = (...userRoles: UserRole[]) =>
	SetMetadata(USER_ROLES_KEY, userRoles);
