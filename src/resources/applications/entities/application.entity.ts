import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "@src/resources/categories/entities/category.entity";
import { Comment } from "@src/resources/comments/entities/comment.entity";

@Entity()
export class Application {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@Column("varchar", { length: 89 })
	name = "";

	@Column("text")
	description = "";

	@Column("float", { precision: 6, scale: 2, unsigned: true })
	price = 0;

	@Column("decimal", { precision: 3, scale: 2, unsigned: true })
	discount = 0;

	@Column("int", { unsigned: true, default: 0 })
	downloads = 0;

	@Column("varchar", { length: 9 })
	spaces = "";

	//!INVESTIGAR
	@Column("varchar", { length: 2083 })
	image_url = "";

	@Column("varchar", { length: 600 })
	image_alt = "";
	//! ******/

	@Column("timestamp", {
		nullable: false,
		default: () => "CURRENT_TIMESTAMP",
	})
	publication_date: Date = new Date();

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
