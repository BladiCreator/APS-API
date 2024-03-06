import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Application } from "../../applications/entities/application.entity";

@Entity()
export class Category {
	@PrimaryGeneratedColumn()
	id = 0;

	@Column("varchar", { length: 21, unique: true })
	name = "";

	@ManyToOne(
		() => Application,
		(application) => application.categories,
	)
	application: Application = new Application();
}
