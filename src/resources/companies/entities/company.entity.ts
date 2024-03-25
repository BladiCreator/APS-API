import { Column, Entity, JoinTable, ManyToMany } from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { Application } from "@src/resources/applications/entities/application.entity";
import { User } from "@src/resources/users/entities/user.entity";

@Entity({ name: "companies" })
export class Company extends AbstractEntity {
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
