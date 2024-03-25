import { Test, TestingModule } from "@nestjs/testing";
import { PaymentCardController } from "../../../../src/resources/payment-card/payment-card.controller";
import { PaymentCardService } from "../../../../src/resources/payment-card/payment-card.service";

describe("PaymentCardController", () => {
	let controller: PaymentCardController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PaymentCardController],
			providers: [PaymentCardService],
		}).compile();

		controller = module.get<PaymentCardController>(PaymentCardController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
