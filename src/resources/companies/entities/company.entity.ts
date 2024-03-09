import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Application } from "@src/resources/applications/entities/application.entity";

@Entity({name: "companies"})
export class Company {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@Column("varchar", { length: 50 })
	name = "";

	@Column("text")
	description = "";

	@ManyToMany(() => Application)
	@JoinTable()
	applications!: Application[];
}
