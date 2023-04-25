import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BindTcpController } from '@nest-datum/bind';
import { FormFormOptionService } from './form-form-option.service';

@Controller()
export class FormFormOptionTcpController extends BindTcpController {
	constructor(
		protected service: FormFormOptionService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'formOptionRelation.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'formOptionRelation.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('formOptionRelation.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('formOptionRelation.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('formOptionRelation.create')
	async create(payload) {
		return await super.create(payload);
	}
}
