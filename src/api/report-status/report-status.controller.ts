import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusTcpController } from '@nest-datum/status';
import { ReportStatusService } from './report-status.service';

@Controller()
export class ReportStatusController extends StatusTcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: ReportStatusService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'reportStatus.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'reportStatus.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('reportStatus.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('reportStatus.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('reportStatus.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('reportStatus.update')
	async update(payload) {
		return await super.update(payload);
	}
}
