import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";

import { CreateApplicationDto } from "@src/resources/applications/dto/create-application.dto";
import { UpdateApplicationDto } from "@src/resources/applications/dto/update-application.dto";
import { Application } from "@src/resources/applications/entities/application.entity";

import { ApplicationsService } from "../../../../src/resources/applications/applications.service";

describe("ApplicationsService", () => {
  let applicationsService: ApplicationsService;

  const mockApplicationsRepository = {
    find: jest.fn().mockImplementation(() =>
      Promise.resolve([
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
      ]),
    ),
    findOneBy: jest.fn().mockImplementation(id =>
      Promise.resolve({
        id: id as string,
        name: "",
        price: 0,
        downloads: 0,
        spaces: "",
      }),
    ),
    create: jest.fn().mockImplementation(dto => dto as CreateApplicationDto),
    save: jest.fn().mockImplementation(application =>
      Promise.resolve({
        id: Date.now().toString(),
        ...application,
      }),
    ),
    update: jest
      .fn()
      .mockImplementation((id: string, dto: UpdateApplicationDto) =>
        Promise.resolve({
          id: id,
          ...dto,
        }),
      ),
    remove: jest.fn().mockImplementation(id =>
      Promise.resolve({
        id: id as string,
        name: "",
        price: 0,
        downloads: 0,
        spaces: "",
      }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicationsService,
        {
          provide: getRepositoryToken(Application),
          useValue: mockApplicationsRepository, // Use the actual Repository class or a custom mock
        },
      ],
    }).compile();

    applicationsService = module.get<ApplicationsService>(ApplicationsService);
  });

  it("should be defined", () => {
    expect(applicationsService).toBeDefined();
  });

  it("should create a new application and return that", async () => {
    expect(
      await applicationsService.create({
        name: "AppNameTest",
        price: 10,
        downloads: 1_561_541_561,
        spaces: "9.54GB",
      }),
    ).toEqual({
      id: expect.anything() as string,
      name: "AppNameTest",
      price: 10,
      downloads: 1_561_541_561,
      spaces: "9.54GB",
    });
  });

  it("should find all applications", async () => {
    const apps = [
      {
        id: Date.now().toString(),
        name: "test1",
        price: 6,
        downloads: 1_561_561,
        spaces: "3.8KB",
      },
      {
        id: Date.now().toString(),
        name: "test2",
        price: 2,
        downloads: 156_541_561,
        spaces: "2.5KB",
      },
    ];

    mockApplicationsRepository.find.mockReturnValue(apps);

    expect(await applicationsService.findAll()).toEqual(apps);
  });

  it("should find application by id", async () => {
    const id1: string = Date.now().toString();
    const app = {
      id: id1,
      name: "test1",
      price: 6,
      downloads: 1_561_561,
      spaces: "3.8KB",
    };

    mockApplicationsRepository.findOneBy.mockReturnValue({
      id: id1,
      name: "test1",
      price: 6,
      downloads: 1_561_561,
      spaces: "3.8KB",
    });

    expect(await applicationsService.findOne(id1)).toEqual(app);
  });

  it("should update an application and return that", async () => {
    const id = "uuid-test";
    const dto: UpdateApplicationDto = {
      name: "AppNameTest",
      price: 10,
      downloads: 1_561_541_561,
      spaces: "9.54GB",
    };

    expect(await applicationsService.update(id, dto)).toEqual({
      id: expect.anything() as string,
      ...dto,
    });
  });
});
