import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { StatusTcpController } from '@nest-datum/status';
import { FieldStatusService } from './field-status.service';

@Controller()
export class FieldStatusTcpController extends StatusTcpController {
	constructor(
		protected service: FieldStatusService,
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
