import { RolesGuard } from "../../../../src/auth/guards/roles.guard";

describe("RolesGuard", () => {
	it("should be defined", () => {
		expect(new RolesGuard()).toBeDefined();
	});
});
