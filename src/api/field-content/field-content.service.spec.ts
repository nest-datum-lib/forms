import { Test, TestingModule } from '@nestjs/testing';
import { FieldContentService } from './field-content.service';

describe('FieldContentService', () => {
	let service: FieldContentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FieldContentService],
		}).compile();

		service = module.get<FieldContentService>(FieldContentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
