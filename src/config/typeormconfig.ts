import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: this.configService.get<string>("DATABASE_HOST"),
      port: this.configService.get<number>("MYSQL_DOC_PORT"),
      username: this.configService.get<string>("MYSQL_USER"),
      password: this.configService.get<string>("MYSQL_PASSWORD"),
      database: this.configService.get<string>("MYSQL_DATABASE"),
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
