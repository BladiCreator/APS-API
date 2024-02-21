import { AuthGuard } from "../../../../src/auth/guards/auth.guard";

describe("AuthGuard", () => {
	it("should be defined", () => {
		expect(new AuthGuard()).toBeDefined();
	});
});
