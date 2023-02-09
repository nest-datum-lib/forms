import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionTcpController as NestDatumOptionTcpController } from '@nest-datum/option';
import { FieldOptionService } from './field-option.service';

@Controller()
export class FieldOptionController extends NestDatumOptionTcpController {
	constructor(
		public transportService: TransportService,
		public service: FieldOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'fieldOption.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'fieldOption.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('fieldOption.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('fieldOption.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('fieldOption.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('fieldOption.update')
	async update(payload) {
		return await super.update(payload);
	}
}
