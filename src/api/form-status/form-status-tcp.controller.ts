import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { StatusTcpController } from '@nest-datum/status';
import { FormStatusService } from './form-status.service';

@Controller()
export class FormStatusTcpController extends StatusTcpController {
	constructor(
		protected service: FormStatusService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'formStatus.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'formStatus.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('formStatus.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('formStatus.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('formStatus.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('formStatus.update')
	async update(payload) {
		return await super.update(payload);
	}
}
