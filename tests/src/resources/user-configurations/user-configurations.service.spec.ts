import { Test, TestingModule } from "@nestjs/testing";
import { UserConfigurationsService } from "../../../../src/resources/user-configurations/user-configurations.service";

describe("UserConfigurationsService", () => {
	let service: UserConfigurationsService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UserConfigurationsService],
		}).compile();

		service = module.get<UserConfigurationsService>(UserConfigurationsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
