import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Application } from "../../applications/entities/application.entity";

@Entity({name: "categories"})
export class Category {
	@PrimaryGeneratedColumn()
	id = 0;

	@Column("varchar", { length: 21, unique: true })
	name = "";

	@ManyToMany(
		() => Application,
		(applications) => applications.categories,
	)
	applications!: Application[];
}
