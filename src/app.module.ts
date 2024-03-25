import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { HealthModule } from "@core/health/health.module";
import { LoggerModule } from "@core/logger/logger.module";

import { AuthModule } from "./auth/auth.module";
import { ApplicationsModule } from "./resources/applications/applications.module";
import { CategoriesModule } from "./resources/categories/categories.module";
import { CompaniesModule } from "./resources/companies/companies.module";
import { FeedbacksModule } from "./resources/feedbacks/feedbacks.module";
import { UsersModule } from "./resources/users/users.module";
import { UserConfigurationsModule } from "./resources/user-configurations/user-configurations.module";
import { BankAccountsModule } from "./resources/bank-accounts/bank-accounts.module";
import { MediasModule } from "./resources/medias/medias.module";
import { PaymentCardModule } from "./resources/payment-card/payment-card.module";
import { OperatingSystemsModule } from "./resources/operating-systems/operating-systems.module";
import { DatabaseModule } from './config/database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			cache: true,
		}),
		LoggerModule,
		DatabaseModule,
		HealthModule,
		ApplicationsModule,
		UsersModule,
		CompaniesModule,
		CategoriesModule,
		AuthModule,
		FeedbacksModule,
		UserConfigurationsModule,
		BankAccountsModule,
		MediasModule,
		PaymentCardModule,
		OperatingSystemsModule,
	],
})
export class AppModule {}
