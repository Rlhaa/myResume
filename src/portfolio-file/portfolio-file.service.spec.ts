import { Test, TestingModule } from '@nestjs/testing';
import { PortfolioFileService } from './portfolio-file.service';

describe('PortfolioFileService', () => {
  let service: PortfolioFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortfolioFileService],
    }).compile();

    service = module.get<PortfolioFileService>(PortfolioFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
