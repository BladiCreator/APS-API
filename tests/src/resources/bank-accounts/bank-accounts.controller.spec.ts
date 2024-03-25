import { Test, TestingModule } from '@nestjs/testing';
import { BankAccountsController } from '../../../../src/resources/bank-accounts/bank-accounts.controller';
import { BankAccountsService } from '../../../../src/resources/bank-accounts/bank-accounts.service';

describe('BankAccountsController', () => {
  let controller: BankAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankAccountsController],
      providers: [BankAccountsService],
    }).compile();

    controller = module.get<BankAccountsController>(BankAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
