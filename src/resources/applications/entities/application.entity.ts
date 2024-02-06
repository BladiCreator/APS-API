import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Application {
  @PrimaryGeneratedColumn("uuid")
  id: string = ""; //uuid

  @Column("varchar", { length: 89 })
  name: string = ""; //VARCHAR(89)
  @Column("float", { precision: 6, scale: 2, unsigned: true })
  price: number = 0; //Float(6,2) if is 0 is free
  @Column("int", { unsigned: true })
  downloads: number = 0; // Unsigned INT
  @Column("varchar", { length: 5 })
  space: string = ""; //varchar(5)

  // company!: Company;
  // developers!: User[];
  // categories: Category[];
  // publication_date: Date;
}
