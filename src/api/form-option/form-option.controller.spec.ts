import { Test, TestingModule } from '@nestjs/testing';
import { FormOptionController } from './form-option.controller';

describe('FormOptionController', () => {
	let controller: FormOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FormOptionController],
		}).compile();

		controller = module.get<FormOptionController>(FormOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
