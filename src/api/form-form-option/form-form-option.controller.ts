import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { OptionOptionTcpController } from '@nest-datum/option';
import { FormFormOptionService } from './form-form-option.service';

@Controller()
export class FormFormOptionController extends OptionOptionTcpController {
	protected entityId = 'formId';
	protected entityOptionId = 'formOptionId';

	constructor(
		protected transportService: TransportService,
		protected entityService: FormFormOptionService,
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
