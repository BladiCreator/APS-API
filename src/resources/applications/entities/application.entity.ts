import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4(); //uuid

  @Column("varchar", { length: 89 })
  name: string = ""; //VARCHAR(89)
  @Column("float", { precision: 6, scale: 2, unsigned: true })
  price: number = 0; //Float(6,2) if is 0 is free
  @Column("int", { unsigned: true })
  downloads: number = 0; // Unsigned INT
  @Column("varchar", { length: 9 })
  spaces: string = ""; //varchar(9)

  // company!: Company;
  // users!: User[];
  // categories: Category[];
  // publication_date: Date;
}
