import { AuthGuard } from "../../../../src/common/guards/auth.guard";

describe("AuthGuard", () => {
	it("should be defined", () => {
		expect(new AuthGuard()).toBeDefined();
	});
});
