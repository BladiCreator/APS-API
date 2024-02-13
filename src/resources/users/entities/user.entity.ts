import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { Application } from "@src/resources/applications/entities/application.entity";
import { Comment } from "@src/resources/comments/entities/comment.entity";
import { Company } from "@src/resources/companies/entities/company.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string = uuidv4(); // uuid

  @Column("varchar")
  email: string = ""; // VARCHAR(255) NOT NULL,
  @Column("varchar")
  password: string = ""; // VARCHAR(255) NOT NULL, (Encriptable)

  @Column("varchar")
  image_url?: string; //Investigate about this

  // TODO: Role system
  // role: string[]; //only user and developer default: "user"

  @OneToMany(() => Comment, comment => comment.user)
  comments!: Comment[];

  @ManyToMany(() => Company)
  @JoinTable()
  company!: Company[];

  @ManyToMany(() => Application)
  @JoinTable()
  applications!: Application[];

  // configuration: Configuration; //One to One
}
