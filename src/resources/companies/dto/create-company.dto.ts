import { ApiProperty } from "@nestjs/swagger";
import { Application } from "@src/resources/applications/entities/application.entity";
import { User } from "@src/resources/users/entities/user.entity";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
	@ApiProperty({ type: String })
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	name: string;

	@ApiProperty({ type: String })
	@IsString()
	@IsNotEmpty()
	@MaxLength(1200)
	description: string;

	@ApiProperty({ type: [Application] })
	@IsArray()
	applications: Application[];

	@ApiProperty({ type: [User] })
	@IsArray()
	users: User[];

	constructor(
		name: string,
		description: string,
		applications: Application[],
		users: User[],
	) {
		this.name = name;
		this.description = description;
		this.applications = applications;
		this.users = users;
	}
}
