import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { Column, Entity, ManyToMany } from "typeorm";
import { Application } from "../../applications/entities/application.entity";

@Entity({ name: "operating_systems" })
export class OperatingSystem extends AbstractEntity {
	@ApiProperty({ type: String })
	@Column("varchar", { length: 60, unique: true })
	name = "";

	@ApiProperty({ type: [Application] })
	@ManyToMany(
		() => Application,
		(application) => application.operating_systems,
	)
	applications!: Application[];
}
