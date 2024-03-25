import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PaymentCard } from "./entities/payment-card.entity";
import { PaymentCardController } from "./payment-card.controller";
import { PaymentCardService } from "./payment-card.service";

@Module({
	imports: [TypeOrmModule.forFeature([PaymentCard])],
	controllers: [PaymentCardController],
	providers: [PaymentCardService],
})
export class PaymentCardModule {}
