import { Test, TestingModule } from '@nestjs/testing';
import { FormOptionService } from './form-option.service';

describe('FormOptionService', () => {
	let service: FormOptionService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FormOptionService],
		}).compile();

		service = module.get<FormOptionService>(FormOptionService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
