import { Test, TestingModule } from '@nestjs/testing';
import { ContentStatusController } from './content-status.controller';

describe('ContentStatusController', () => {
	let controller: ContentStatusController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ContentStatusController],
		}).compile();

		controller = module.get<ContentStatusController>(ContentStatusController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
