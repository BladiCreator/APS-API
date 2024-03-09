import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { UserRole } from "@src/core/enums/user-roles.enum";
import { Application } from "@src/resources/applications/entities/application.entity";
import { Comment } from "@src/resources/comments/entities/comment.entity";
import { Company } from "@src/resources/companies/entities/company.entity";

@Entity({ name: "users" })
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4(); // uuid

	@Column("varchar", { length: 36, nullable: false })
	user_name = "";

	@Column("varchar", { unique: true, nullable: false })
	email = "";

	@Column("varchar", { nullable: false })
	password = "";

	@Column("varchar", { length: 36, nullable: true })
	first_name = "";

	@Column("varchar", { length: 36, nullable: true })
	last_name?: string;

	@Column("varchar", { nullable: true })
	image_url?: string;

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
