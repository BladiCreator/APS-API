import { ApiProperty } from "@nestjs/swagger";
import { AbstractEntity } from "@src/common/classes/abstract-entity.class";
import { Application } from "@src/resources/applications/entities/application.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: "medias" })
export class Media extends AbstractEntity {
	@ApiProperty({ type: String })
	@Column("varchar", { length: 600, default: "" })
	url = "";

	@ApiProperty({ type: String })
	@Column("varchar", { default: "" })
	alt = "";

	@ApiProperty({ type: () => Application })
	@ManyToOne(
		() => Application,
		(application) => application.medias,
		{ onDelete: "CASCADE" },
	)
	application!: Application;
}
