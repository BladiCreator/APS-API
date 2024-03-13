import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@src/core/enums/user-roles.enum";
import { Application } from "@src/resources/applications/entities/application.entity";
import { Company } from "@src/resources/companies/entities/company.entity";
import { Feedback } from "@src/resources/feedbacks/entities/feedback.entity";

@Entity({ name: "users" })
export class User {
	@ApiProperty()
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4(); // uuid

	@ApiProperty({ type: String })
	@Column("varchar", { length: 36, nullable: false })
	user_name = "";

	@ApiProperty({ type: String })
	@Column("varchar", { unique: true, nullable: false })
	email = "";

	@ApiProperty({ type: String })
	@Column("varchar", { nullable: false })
	password = "";

	@ApiProperty({ type: String })
	@Column("varchar", { length: 36, nullable: true })
	first_name = "";

	@ApiProperty({ type: String })
	@Column("varchar", { length: 36, nullable: true })
	last_name?: string;

	@ApiProperty({ type: String })
	@Column("varchar", { nullable: true })
	image_url?: string;

	@ApiProperty({ type: [UserRole], enum: UserRole })
	@Column({
		type: "set",
		enum: UserRole,
		default: [UserRole.User],
	})
	roles!: UserRole[]; //only user and developer default: "user"

	@ApiProperty({ type: () => [Feedback] })
	@OneToMany(
		() => Feedback,
		(feedbacks) => feedbacks.user,
	)
	feedbacks!: Feedback[];

	@ApiProperty({ type: [Company] })
	@ManyToMany(
		() => Company,
		(companies) => companies.users,
	)
	@JoinTable()
	companies!: Company[];

	@ApiProperty({ type: [Application] })
	@ManyToMany(() => Application)
	@JoinTable()
	applications!: Application[];

	// configuration: Configuration; //One to One
}
