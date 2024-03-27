import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

const configService = new ConfigService();

export default new DataSource({
	type: "mysql",
	host: configService.getOrThrow<string>("DATABASE_HOST"),
	port: configService.getOrThrow<number>("MYSQL_DOC_PORT"),
	username: configService.getOrThrow<string>("MYSQL_USER"),
	password: configService.getOrThrow<string>("MYSQL_PASSWORD"),
	database: configService.getOrThrow<string>("MYSQL_DATABASE"),
	migrations: ["src/database/migrations/*{.ts,.js}"],
	entities: ["src/resources/**/entities/*.entity{.ts,.js}"],
});
