import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Application } from "@src/resources/applications/entities/application.entity";

@Entity()
export class Company {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4(); // uuid

	@Column("varchar", { length: 50 })
	name = ""; //VARCHAR(50) i've to investigate

	@ManyToMany(() => Application)
	@JoinTable()
	applications!: Application[];
}
