import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Category } from "@src/resources/categories/entities/category.entity";
import { Comment } from "@src/resources/comments/entities/comment.entity";

@Entity()
export class Application {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4(); //uuid

	@Column("varchar", { length: 89 })
	name = ""; //VARCHAR(89)

	@Column("float", { precision: 6, scale: 2, unsigned: true })
	price = 0; //Float(6,2) if is 0 is free

	@Column("int", { unsigned: true, default: 0 })
	downloads = 0; // Unsigned INT

	@Column("varchar", { length: 9 })
	spaces = ""; //varchar(9)

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
