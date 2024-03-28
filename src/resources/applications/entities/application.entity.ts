import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	OneToMany,
	UpdateDateColumn,
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { Category } from "@src/resources/categories/entities/category.entity";
import { Feedback } from "@src/resources/feedbacks/entities/feedback.entity";
import { Media } from "@src/resources/medias/entities/media.entity";
import { OperatingSystem } from "@src/resources/operating-systems/entities/operating-system.entity";
import { User } from "@src/resources/users/entities/user.entity";
import { PEGIRating } from "../../../common/enums/pegi.enum";

@Entity({ name: "applications" })
export class Application extends AbstractEntity {
	@ApiProperty({ type: String })
	@Column("varchar", { length: 89 })
	name = "";

	@ApiProperty({ type: String })
	@Column("text")
	description = "";

	@ApiProperty({ type: Number })
	@Column("float", { precision: 6, scale: 2, unsigned: true })
	price = 0;

	@ApiProperty({ type: Number })
	@Column("decimal", { precision: 3, scale: 2, unsigned: true, default: 0 })
	discount = 0;

	@ApiProperty({ type: String })
	@Column("varchar", { length: 9 })
	spaces = "";

	@ApiProperty({ enum: PEGIRating })
	@Column({
		type: "enum",
		enum: PEGIRating,
		default: PEGIRating.Three,
	})
	pegi_rating!: PEGIRating;

	@ApiProperty({ type: Date })
	@CreateDateColumn()
	publication_date: Date = new Date();

	@ApiProperty({ type: Date })
	@UpdateDateColumn()
	update_date: Date = new Date();

	@ManyToMany(
		() => OperatingSystem,
		(operating_systems) => operating_systems.applications,
	)
	@JoinTable()
	operating_systems!: OperatingSystem[];

	@OneToMany(
		() => Media,
		(media: Media) => media.application,
		{
			nullable: true,//TODO: Es una medida temporal, la app no puede estar sin media(Imágenes)
		},
	)
	medias!: Media[];

	@ApiProperty({ type: [Category] })
	@ManyToMany(
		() => Category,
		(categories) => categories.applications,
	)
	@JoinTable()
	categories!: Category[];

	@ApiProperty({ type: [Feedback] })
	@OneToMany(
		() => Feedback,
		(comment: Feedback) => comment.application,
	)
	feedbacks!: Feedback[];

	@ApiProperty({ type: [User] })
	@ManyToMany(
		() => User,
		(users) => users.applications,
	)
	users!: User[];
}
