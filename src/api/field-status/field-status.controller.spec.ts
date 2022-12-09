import { Test, TestingModule } from '@nestjs/testing';
import { FieldStatusController } from './field-status.controller';

describe('FieldStatusController', () => {
	let controller: FieldStatusController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [FieldStatusController],
		}).compile();

		controller = module.get<FieldStatusController>(FieldStatusController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
