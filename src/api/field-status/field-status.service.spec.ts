import { Test, TestingModule } from '@nestjs/testing';
import { FieldStatusService } from './field-status.service';

describe('FieldStatusService', () => {
	let service: FieldStatusService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FieldStatusService],
		}).compile();

		service = module.get<FieldStatusService>(FieldStatusService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
