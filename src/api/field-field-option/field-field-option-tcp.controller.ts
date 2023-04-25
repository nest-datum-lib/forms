import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BindTcpController } from '@nest-datum/bind';
import { FieldFieldOptionService } from './field-field-option.service';

@Controller()
export class FieldFieldOptionTcpController extends BindTcpController {
	constructor(
		protected service: FieldFieldOptionService,
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
