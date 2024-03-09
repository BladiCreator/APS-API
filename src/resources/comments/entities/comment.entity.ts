import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { User } from "@src/resources/users/entities/user.entity";

import { Application } from "../../applications/entities/application.entity";

@Entity({ name: "comments" })
export class Comment {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@Column("varchar", { length: 500 })
	text = "";

	@CreateDateColumn()
	publication_date: Date = new Date();

	@UpdateDateColumn()
	update_date: Date = new Date();

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
