import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "@src/resources/users/entities/user.entity";

import { Application } from "../../applications/entities/application.entity";

@Entity()
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@Column("text")
	text = "";

	@Column("timestamp", {
		nullable: false,
		default: () => "CURRENT_TIMESTAMP",
	})
	publication_date: Date = new Date();

	@ManyToOne(
		() => User,
		(user: User) => user.comments,
	)
	user: User = new User();

	@ManyToOne(
		() => Application,
		(application: Application) => application.comments,
	)
	application: Application = new Application();
}
