import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";

import { AuthModule } from "./auth/auth.module";
import { ApplicationsModule } from "./resources/applications/applications.module";
import { CategoriesModule } from "./resources/categories/categories.module";
import { CommentsModule } from "./resources/comments/comments.module";
import { CompaniesModule } from "./resources/companies/companies.module";
import { UsersModule } from "./resources/users/users.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    LoggerModule,
    HealthModule,
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
        synchronize: true,
      }),

      dataSourceFactory: async options => {
        const dataSource = await new DataSource(options!).initialize();
        return dataSource;
      },
    }),
    ApplicationsModule,
    UsersModule,
    CompaniesModule,
    CategoriesModule,
    CommentsModule,
    AuthModule,
  ],
})
export class AppModule {}
