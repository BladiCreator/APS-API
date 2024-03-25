import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@src/common/guards/auth.guard";
import { CreatePaymentCardDto } from "./dto/create-payment-card.dto";
import { UpdatePaymentCardDto } from "./dto/update-payment-card.dto";
import { PaymentCardService } from "./payment-card.service";

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags("Payment Card")
@Controller("payment-card")
export class PaymentCardController {
	constructor(private readonly paymentCardService: PaymentCardService) {}

	@Post()
	@ApiBody({ type: CreatePaymentCardDto })
	create(@Body() createPaymentCardDto: CreatePaymentCardDto) {
		return this.paymentCardService.create(createPaymentCardDto);
	}

	@Get()
	findAll() {
		return this.paymentCardService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.paymentCardService.findOne(id);
	}

	@Patch(":id")
	@ApiBody({ type: UpdatePaymentCardDto })
	update(
		@Param("id") id: string,
		@Body() updatePaymentCardDto: UpdatePaymentCardDto,
	) {
		return this.paymentCardService.update(id, updatePaymentCardDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.paymentCardService.remove(id);
	}
}
