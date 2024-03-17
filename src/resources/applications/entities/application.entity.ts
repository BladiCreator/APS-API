import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { ApiProperty } from "@nestjs/swagger";
import { Category } from "@src/resources/categories/entities/category.entity";
import { Feedback } from "@src/resources/feedbacks/entities/feedback.entity";
import { User } from "@src/resources/users/entities/user.entity";
import { PEGIRating } from "../../../core/enums/pegi.enum";

@Entity({ name: "applications" })
export class Application {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@ApiProperty({ type: String })
	@Column("varchar", { length: 89 })
	name = "";

	@ApiProperty({ type: String })
	@Column("text")
	description = "";

	@ApiProperty({ type: Number })
	@Column("float", { precision: 6, scale: 2, unsigned: true })
	price = 0;

	@ApiProperty({ type: Number })
	@Column("decimal", { precision: 3, scale: 2, unsigned: true, default: 0 })
	discount = 0;

	//TODO: Sujeto a ser eliminado debido a que se podría obtener mediante la cantidad de usuarios
	@ApiProperty({ type: Number })
	@Column("int", { unsigned: true, default: 0 })
	downloads = 0;

	@ApiProperty({ type: String })
	@Column("varchar", { length: 9 })
	spaces = "";

	@ApiProperty({ type: String })
	@Column("varchar", { length: 600, default: "" })
	image_url = "";

	@ApiProperty({ type: String })
	@Column("varchar", { default: "" })
	image_alt = "";

	@ApiProperty({ enum: PEGIRating })
	@Column({
		type: "enum",
		enum: PEGIRating,
		default: PEGIRating.Three,
	})
	PEGI_rating!: number;

	@ApiProperty({ type: Date })
	@CreateDateColumn()
	publication_date: Date = new Date();

	@ApiProperty({ type: Date })
	@UpdateDateColumn()
	update_date: Date = new Date();

	@ApiProperty({ type: [Category] })
	@ManyToMany(
		() => Category,
		(categories) => categories.applications,
	)
	@JoinTable()
	categories!: Category[];

	@ApiProperty({ type: [Feedback] })
	@OneToMany(
		() => Feedback,
		(comment: Feedback) => comment.application,
	)
	@JoinTable()
	feedbacks!: Feedback[];

	@ApiProperty({ type: [User] })
	@ManyToMany(
		() => User,
		(users) => users.applications,
	)
	users!: User[];
}
