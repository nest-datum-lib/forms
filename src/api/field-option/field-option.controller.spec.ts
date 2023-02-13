import { Test, TestingModule } from '@nestjs/testing';
import { FieldOptionController } from './field-option.controller';

describe('FieldOptionController', () => {
	let controller: FieldOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FieldOptionController],
		}).compile();

		controller = module.get<FieldOptionController>(FieldOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
