import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionTcpController as NestDatumOptionOptionTcpController } from '@nest-datum/option';
import { FieldFieldOptionService } from './field-field-option.service';

@Controller()
export class FieldFieldOptionController extends NestDatumOptionOptionTcpController {
	public columnOptionId = 'fieldId';
	public columnOptionOptionId = 'fieldOptionId';

	constructor(
		public transportService: TransportService,
		public service: FieldFieldOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'fieldOptionRelation.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'fieldOptionRelation.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('fieldOptionRelation.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('fieldOptionRelation.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('fieldOptionRelation.create')
	async create(payload) {
		return await super.create(payload);
	}
}
