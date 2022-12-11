import { Test, TestingModule } from '@nestjs/testing';
import { FieldFieldOptionService } from './field-field-option.service';

describe('FieldFieldOptionService', () => {
	let service: FieldFieldOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FieldFieldOptionService],
		}).compile();

		service = module.get<FieldFieldOptionService>(FieldFieldOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
