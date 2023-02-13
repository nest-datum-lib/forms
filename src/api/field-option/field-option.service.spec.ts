import { Test, TestingModule } from '@nestjs/testing';
import { FieldOptionService } from './field-option.service';

describe('FieldOptionService', () => {
	let service: FieldOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FieldOptionService],
		}).compile();

		service = module.get<FieldOptionService>(FieldOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
