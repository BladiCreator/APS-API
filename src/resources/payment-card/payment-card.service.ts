import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePaymentCardDto } from "./dto/create-payment-card.dto";
import { UpdatePaymentCardDto } from "./dto/update-payment-card.dto";
import { PaymentCard } from "./entities/payment-card.entity";

@Injectable()
export class PaymentCardService {
	constructor(
		@InjectRepository(PaymentCard)
		private readonly paymentCardRepository: Repository<PaymentCard>,
	) {}

	async create(createPaymentCardDto: CreatePaymentCardDto) {
		return await this.paymentCardRepository.save(createPaymentCardDto);
	}

	async findAll() {
		return await this.paymentCardRepository.find();
	}

	async findOne(id: string) {
		const paymentCard = await this.paymentCardRepository.findOneBy({ id });

		if (!paymentCard) {
			throw new NotFoundException("PaymentCard does not exist!");
		}

		return paymentCard;
	}

	async update(id: string, updatePaymentCardDto: UpdatePaymentCardDto) {
		return await this.paymentCardRepository.save({
			id: id,
			...updatePaymentCardDto,
		});
	}

	async remove(id: string) {
		const paymentCard = await this.findOne(id);

		return await this.paymentCardRepository.remove(paymentCard);
	}
}
