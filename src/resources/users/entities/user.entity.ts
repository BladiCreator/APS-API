import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToMany,
	OneToOne,
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { UserRole } from "@src/common/enums/user-roles.enum";
import { Application } from "@src/resources/applications/entities/application.entity";
import { Company } from "@src/resources/companies/entities/company.entity";
import { Feedback } from "@src/resources/feedbacks/entities/feedback.entity";
import { Media } from "@src/resources/medias/entities/media.entity";
import { UserConfiguration } from "@src/resources/user-configurations/entities/user-configuration.entity";

@Entity({ name: "users" })
export class User extends AbstractEntity {
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
	first_name?: string;

	@ApiProperty({ type: String })
	@Column("varchar", { length: 36, nullable: true })
	last_name?: string;

	@ApiProperty({ type: [UserRole], enum: UserRole })
	@Column("enum", {
		enum: UserRole,
		default: UserRole.User,
	})
	role!: UserRole; //only user and developer default: "user"

	@ApiProperty({ type: () => Media })
	@OneToOne(() => Media, { nullable: true, cascade: true })
	@JoinColumn({ name: "media_id" })
	media!: Media;

	@ApiProperty({ type: () => UserConfiguration })
	@OneToOne(() => UserConfiguration)
	@JoinColumn({ name: "configuration_id" })
	configuration!: UserConfiguration;

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
