import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { OptionTcpController } from '@nest-datum/option';
import { FormOptionService } from './form-option.service';

@Controller()
export class FormOptionTcpController extends OptionTcpController {
	constructor(
		protected service: FormOptionService,
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

	@EventPattern('form.content')
	async content(payload) {
		return await super.content(payload);
	}

	@EventPattern('form.contentUpdate')
	async contentUpdate(payload) {
		return await super.contentUpdate(payload);
	}
}
