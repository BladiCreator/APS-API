import { ApiProperty } from "@nestjs/swagger";
import { Application } from "@src/resources/applications/entities/application.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "medias" })
export class Media {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

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
