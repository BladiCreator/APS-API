import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Application } from "@src/resources/applications/entities/application.entity";
import { User } from "@src/resources/users/entities/user.entity";

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

	//TODO: Hacer las relaciones entre el usuario que es developer y la compañía
	// @OneToMany(() => Application, (application) => application.company)
	// @ManyToMany(() => User)
	// @JoinTable()
	// applications!: Application[];
}
