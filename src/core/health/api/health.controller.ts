import { Controller, Get, HttpCode, Inject, Logger } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@Controller("health")
@ApiTags("Health")
export class HealthController {
	constructor(@Inject(Logger) private readonly logger: Logger) {}

	@Get()
	@HttpCode(200)
	run() {
		this.logger.log("Health endpoint called!");
		return { status: "ok" };
	}
}
