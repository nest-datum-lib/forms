import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { StatusTcpController } from '@nest-datum/status';
import { FieldStatusService } from './field-status.service';

@Controller()
export class FieldStatusController extends StatusTcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: FieldStatusService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'fieldStatus.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'fieldStatus.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('fieldStatus.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('fieldStatus.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('fieldStatus.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('fieldStatus.update')
	async update(payload) {
		return await super.update(payload);
	}
}
