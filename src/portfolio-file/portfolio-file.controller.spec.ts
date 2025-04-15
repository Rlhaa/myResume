import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioFileController } from './portfolio-file.controller';

describe('PortfolioFileController', () => {
  let controller: PortfolioFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortfolioFileController],
    }).compile();

    controller = module.get<PortfolioFileController>(PortfolioFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
