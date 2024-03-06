import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "@src/resources/categories/entities/category.entity";
import { Comment } from "@src/resources/comments/entities/comment.entity";

@Entity()
export class Application {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@Column("varchar", { length: 89 })
	name = "";

	@Column("varchar", { length: 500 })
	description = "";

	@Column("float", { precision: 6, scale: 2, unsigned: true })
	price = 0;

	@Column("decimal", { precision: 3, scale: 2, unsigned: true, default: 0 })
	discount = 0;

	@Column("int", { unsigned: true, default: 0 })
	downloads = 0;

	@Column("varchar", { length: 9 })
	spaces = "";

	@Column("varchar", { length: 600, default: "" })
	image_url = "";

	@Column("varchar", { default: "" })
	image_alt = "";

	@CreateDateColumn()
	publication_date: Date = new Date();

	@UpdateDateColumn()
	update_date: Date = new Date();

	@OneToMany(
		() => Comment,
		(comment: Comment) => comment.application,
	)
	comments!: Comment[];

	@OneToMany(
		() => Category,
		(categories) => categories.application,
	)
	categories!: Category[];
}
