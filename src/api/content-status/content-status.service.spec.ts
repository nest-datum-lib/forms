import { Test, TestingModule } from '@nestjs/testing';
import { ContentStatusService } from './content-status.service';

describe('ContentStatusService', () => {
	let service: ContentStatusService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ContentStatusService],
		}).compile();

		service = module.get<ContentStatusService>(ContentStatusService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
