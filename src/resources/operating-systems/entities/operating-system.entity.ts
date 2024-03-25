import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Application } from "../../applications/entities/application.entity";

@Entity({ name: "operating_systems" })
export class OperatingSystem {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

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
