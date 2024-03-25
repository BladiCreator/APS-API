import { ApiProperty } from "@nestjs/swagger";
import { PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

// export class AbstractEntity<T> {
export class AbstractEntity {
	@ApiProperty({ type: String })
	@PrimaryGeneratedColumn("uuid")
	id: string = uuidv4();

	// constructor(entity: Partial<T>) {
	//   Object.assign(this, entity);
	// }
}
