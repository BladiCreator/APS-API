import { Application } from "@src/resources/applications/entities/application.entity";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
	@IsNotEmpty()
	@IsString()
	@MaxLength(50)
	name = "";

	@IsString()
	@IsNotEmpty()
	@MaxLength(1200)
	description = "";

	@IsArray()
	applications: Application[] = [];
}
