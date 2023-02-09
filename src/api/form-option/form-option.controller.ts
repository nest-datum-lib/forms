import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionTcpController as NestDatumOptionTcpController } from '@nest-datum/option';
import { FormOptionService } from './form-option.service';

@Controller()
export class FormOptionController extends NestDatumOptionTcpController {
	constructor(
		public transportService: TransportService,
		public service: FormOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'formOption.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'formOption.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('formOption.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('formOption.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('formOption.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('formOption.update')
	async update(payload) {
		return await super.update(payload);
	}
}
