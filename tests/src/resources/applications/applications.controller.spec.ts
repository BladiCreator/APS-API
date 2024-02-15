import { Test, TestingModule } from "@nestjs/testing";

import { CreateApplicationDto } from "@src/resources/applications/dto/create-application.dto";
import { UpdateApplicationDto } from "@src/resources/applications/dto/update-application.dto";
import { Application } from "@src/resources/applications/entities/application.entity";

import { ApplicationsController } from "../../../../src/resources/applications/applications.controller";
import { ApplicationsService } from "../../../../src/resources/applications/applications.service";

describe("ApplicationsController", () => {
	let controller: ApplicationsController;

	const mockApplicationsService = {
		create: jest.fn((dto) => {
			return {
				id: Date.now().toString(),
				...dto,
			} as Application;
		}),
		findAll: jest.fn(() => {
			return [
				{
					id: Date.now().toString(),
					name: "",
					price: 0,
					downloads: 0,
					spaces: "",
				},
				{
					id: Date.now().toString(),
					name: "",
					price: 0,
					downloads: 0,
					spaces: "",
				},
			];
		}),
		findOne: jest.fn(() => {
			return {
				id: Date.now().toString(),
				name: "",
				price: 0,
				downloads: 0,
				spaces: "",
			};
		}),
		update: jest.fn().mockImplementation(
			(id, dto) =>
				({
					id: id as string,
					...dto,
				}) as Application,
		),
		remove: jest.fn().mockImplementation((id) => {
			return {
				id: id as string,
				name: "",
				price: 0,
				downloads: 0,
				spaces: "",
			} as Application;
		}),
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ApplicationsController],
			providers: [ApplicationsService],
		})
			.overrideProvider(ApplicationsService)
			.useValue(mockApplicationsService)
			.compile();

		controller = module.get<ApplicationsController>(ApplicationsController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});

	it("should create an Applications", () => {
		const mockCreateApplicationDto: CreateApplicationDto = {
			name: "AppNameTest",
			price: 10,
			downloads: 1_561_541_561,
			spaces: "9.54GB",
		};

		expect(controller.create(mockCreateApplicationDto)).toEqual({
			id: expect.anything() as string,
			...mockCreateApplicationDto,
		});

		expect(mockApplicationsService.create).toHaveBeenCalledWith(
			mockCreateApplicationDto,
		);
	});

	it("should find all Applications", () => {
		const apps = [
			{
				id: Date.now().toString(),
				name: "test1",
				price: 6,
				downloads: 4,
				spaces: "3.8KB",
			},
			{
				id: Date.now().toString(),
				name: "test2",
				price: 2,
				downloads: 4,
				spaces: "2.5KB",
			},
		];

		mockApplicationsService.findAll.mockReturnValue(apps);

		expect(controller.findAll()).toEqual(apps);

		expect(mockApplicationsService.findAll).toHaveBeenCalled();
	});

	it("should find an Application by id", () => {
		const id: string = "123";

		const dto: CreateApplicationDto = {
			name: "AppNameTest",
			price: 10,
			downloads: 1_561_541_561,
			spaces: "9.54GB",
		};
		// Configura el mock para devolver un objeto con el mismo ID
		mockApplicationsService.findOne.mockReturnValue({
			id: id,
			...dto,
		});

		expect(controller.findOne(id)).toEqual({
			id: id,
			...dto,
		});

		expect(mockApplicationsService.findOne).toHaveBeenCalled();
	});

	it("should update an Application", () => {
		const mockUpdateApplicationDto: UpdateApplicationDto = {
			name: "AppNameTest",
			price: 10,
			downloads: 1_561_541_561,
			spaces: "9.54GB",
		};

		expect(controller.update("test-uuid", mockUpdateApplicationDto)).toEqual({
			id: "test-uuid",
			...mockUpdateApplicationDto,
		});

		expect(mockApplicationsService.update).toHaveBeenCalled();
	});

	it("should remove an Application", () => {
		const id: string = "test-uuid";
		const dto = {
			name: "AppNameTest",
			price: 10,
			downloads: 1_561_541_561,
			spaces: "9.54GB",
		};

		mockApplicationsService.remove.mockReturnValue({
			id: id,
			...dto,
		});

		expect(controller.remove(id)).toEqual({
			id: id,
			name: expect.anything() as string,
			price: expect.anything() as number,
			downloads: expect.anything() as number,
			spaces: expect.anything() as string,
		} as Application);

		expect(mockApplicationsService.remove).toHaveBeenCalled();
	});
});
