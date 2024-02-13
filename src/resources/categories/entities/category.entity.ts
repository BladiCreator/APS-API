import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Category {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar", { length: 21 })
  name: string = "";
}
