import { Test, TestingModule } from '@nestjs/testing';
import { CreateSheetService } from './create-sheet.service';

describe('CreateSheetService', () => {
  let service: CreateSheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateSheetService],
    }).compile();

    service = module.get<CreateSheetService>(CreateSheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
