import { Application } from "@src/resources/applications/entities/application.entity";
import { User } from "@src/resources/users/entities/user.entity";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	name: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(1200)
	description: string;

	@IsArray()
	applications: Application[];

	@IsArray()
	users: User[];

	constructor(name: string, description: string, applications: Application[], users: User[]) {
		this.name = name;
		this.description = description;
		this.applications = applications;
		this.users = users;
	}
}
