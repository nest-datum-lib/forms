import { Test, TestingModule } from '@nestjs/testing';
import { FieldContentController } from './field-content.controller';

describe('FieldContentController', () => {
	let controller: FieldContentController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FieldContentController],
		}).compile();

		controller = module.get<FieldContentController>(FieldContentController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
