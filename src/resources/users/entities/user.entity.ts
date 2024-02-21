import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { UserRole } from "@src/enums/user-roles.enum";
import { Application } from "@src/resources/applications/entities/application.entity";
import { Comment } from "@src/resources/comments/entities/comment.entity";
import { Company } from "@src/resources/companies/entities/company.entity";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4(); // uuid

	@Column("varchar", { length: 36, nullable: false })
	name = "";

	@Column("varchar", { length: 36, nullable: true })
	last_name?: string;

	@Column("varchar", { unique: true, nullable: false })
	email = ""; // VARCHAR(255) NOT NULL Unique,

	@Column("varchar", { nullable: false })
	password = ""; // VARCHAR(255) NOT NULL, (Encriptado)

	@Column("varchar", { nullable: true })
	image_url?: string; //Investigate about this

	// TODO: Role system
	@Column({
		type: "set",
		enum: UserRole,
		default: [UserRole.User],
	})
	roles!: UserRole[]; //only user and developer default: "user"

	@OneToMany(
		() => Comment,
		(comment) => comment.user,
	)
	comments!: Comment[];

	@ManyToMany(() => Company)
	@JoinTable()
	companies!: Company[];

	@ManyToMany(() => Application)
	@JoinTable()
	applications!: Application[];

	// configuration: Configuration; //One to One
}
