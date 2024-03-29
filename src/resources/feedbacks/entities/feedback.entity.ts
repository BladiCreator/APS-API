import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { Application } from "@src/resources/applications/entities/application.entity";
import { User } from "@src/resources/users/entities/user.entity";
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	UpdateDateColumn,
} from "typeorm";

@Entity({ name: "feedbacks" })
export class Feedback extends AbstractEntity {
	@ApiProperty({ type: Number })
	@Column({ type: "int", default: 1, unsigned: true, width: 1 })
	rate = 1;

	@ApiProperty({ type: String, maxLength: 500 })
	@Column("varchar", { length: 500 })
	text = "";

	@ApiProperty({ type: Date })
	@CreateDateColumn()
	publication_date: Date = new Date();

	@ApiProperty({ type: Date })
	@UpdateDateColumn()
	update_date: Date = new Date();

	@ApiProperty({ type: () => User })
	@ManyToOne(
		() => User,
		(user) => user.feedbacks,
	)
	user: User = new User();

	@ApiProperty({ type: () => Application })
	@ManyToOne(
		() => Application,
		(application: Application) => application.feedbacks,
		{
			onDelete: "CASCADE",
		},
	)
	application: Application = new Application();
}
