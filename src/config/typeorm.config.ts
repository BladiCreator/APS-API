import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

const configService = new ConfigService();

export default new DataSource({
	type: "mysql",
	host: configService.get<string>("DATABASE_HOST"),
	port: configService.get<number>("MYSQL_DOC_PORT"),
	username: configService.get<string>("MYSQL_USER"),
	password: configService.get<string>("MYSQL_PASSWORD"),
	database: configService.get<string>("MYSQL_DATABASE"),
	migrations: ["src/database/migrations/*{.ts,.js}"],
	entities: ["src/resources/**/entities/*.entity{.ts,.js}"],
});
