import { Test, TestingModule } from '@nestjs/testing';
import { FormStatusService } from './form-status.service';

describe('FormStatusService', () => {
	let service: FormStatusService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FormStatusService],
		}).compile();

		service = module.get<FormStatusService>(FormStatusService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
