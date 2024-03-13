import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Application } from "../../applications/entities/application.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "categories" })
export class Category {
	@ApiProperty({ type: Number })
	@PrimaryGeneratedColumn()
	id = 0;

	@ApiProperty({ type: String })
	@Column("varchar", { length: 21, unique: true })
	name = "";

	@ApiProperty({ type: [Application] })
	@ManyToMany(
		() => Application,
		(applications) => applications.categories,
	)
	applications!: Application[];
}
