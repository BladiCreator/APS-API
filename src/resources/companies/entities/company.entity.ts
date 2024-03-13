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
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "companies" })
export class Company {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	@ApiProperty({ type: String })
	@Column("varchar", { length: 50 })
	name = "";

	@ApiProperty({ type: String })
	@Column("text")
	description = "";

	@ApiProperty({ type: [Application] })
	@ManyToMany(() => Application)
	@JoinTable()
	applications!: Application[];

	@ApiProperty({ type: [User] })
	@ManyToMany(() => User)
	@JoinTable()
	users!: User[];
}
