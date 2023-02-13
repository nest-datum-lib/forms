import { Test, TestingModule } from '@nestjs/testing';
import { FormFormOptionController } from './form-form-option.controller';

describe('FormFormOptionController', () => {
	let controller: FormFormOptionController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FormFormOptionController],
		}).compile();

		controller = module.get<FormFormOptionController>(FormFormOptionController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
