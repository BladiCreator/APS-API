import { Test, TestingModule } from "@nestjs/testing";
import { UserConfigurationsController } from "../../../../src/resources/user-configurations/user-configurations.controller";
import { UserConfigurationsService } from "../../../../src/resources/user-configurations/user-configurations.service";

describe("UserConfigurationsController", () => {
	let controller: UserConfigurationsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserConfigurationsController],
			providers: [UserConfigurationsService],
		}).compile();

		controller = module.get<UserConfigurationsController>(
			UserConfigurationsController,
		);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
