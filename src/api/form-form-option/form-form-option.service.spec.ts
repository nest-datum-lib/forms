import { Test, TestingModule } from '@nestjs/testing';
import { FormFormOptionService } from './form-form-option.service';

describe('FormFormOptionService', () => {
	let service: FormFormOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			Forms: [FormFormOptionService],
		}).compile();

		service = module.get<FormFormOptionService>(FormFormOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
