import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "mysql",
				host: configService.get<string>("DATABASE_HOST"),
				port: configService.get<number>("MYSQL_DOC_PORT"),
				username: configService.get<string>("MYSQL_USER"),
				password: configService.get<string>("MYSQL_PASSWORD"),
				database: configService.get<string>("MYSQL_DATABASE"),
				autoLoadEntities: true,
				synchronize: configService.get<boolean>("SYNCHRONIZE"),
			}),

			dataSourceFactory: async (options) => {
				const dataSource = await new DataSource(options!).initialize();
				return dataSource;
			},
		}),
	],
})
export class DatabaseModule {}
