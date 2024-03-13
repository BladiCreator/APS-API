import { Test, TestingModule } from '@nestjs/testing';
import { FeedbacksController } from '../../../../src/resources/feedbacks/feedbacks.controller';
import { FeedbacksService } from '../../../../src/resources/feedbacks/feedbacks.service';

describe('FeedbacksController', () => {
  let controller: FeedbacksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FeedbacksController],
      providers: [FeedbacksService],
    }).compile();

    controller = module.get<FeedbacksController>(FeedbacksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
