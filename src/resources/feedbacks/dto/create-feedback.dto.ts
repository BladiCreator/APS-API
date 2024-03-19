import { Application } from "@src/resources/applications/entities/application.entity";
import { User } from "@src/resources/users/entities/user.entity";
import {
	IsInt,
	IsNotEmpty,
	IsPositive,
	IsString,
	Max,
	MaxLength,
	Min,
} from "class-validator";

export class CreateFeedbackDto {
	@IsNotEmpty()
	@IsInt()
	@IsPositive()
	@Min(1)
	@Max(5)
	rate: number;

	@IsString()
	@IsNotEmpty()
	@MaxLength(500)
	text: string;

	@IsNotEmpty()
	user: User = new User();

	@IsNotEmpty()
	application: Application = new Application();

	constructor(
		rate: number,
		text: string,
		user: User,
		application: Application,
	) {
		this.rate = rate;
		this.text = text;
		this.user = user;
		this.application = application;
	}
}
