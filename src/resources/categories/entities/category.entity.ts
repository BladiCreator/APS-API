import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Application } from "../../applications/entities/application.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column("varchar", { length: 21 })
  name: string = "";

  @ManyToOne(() => Application, application => application.categories)
  application: Application = new Application();
}
