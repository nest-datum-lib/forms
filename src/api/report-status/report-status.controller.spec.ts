import { Test, TestingModule } from '@nestjs/testing';
import { ReportStatusController } from './report-status.controller';

describe('ReportStatusController', () => {
	let controller: ReportStatusController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ReportStatusController],
		}).compile();

		controller = module.get<ReportStatusController>(ReportStatusController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
