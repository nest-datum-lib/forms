import { Test, TestingModule } from '@nestjs/testing';
import { FieldFieldOptionController } from './field-field-option.controller';

describe('FieldFieldOptionController', () => {
	let controller: FieldFieldOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FieldFieldOptionController],
		}).compile();

		controller = module.get<FieldFieldOptionController>(FieldFieldOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
