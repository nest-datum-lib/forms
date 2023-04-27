import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { OptionTcpController } from '@nest-datum/option';
import { FieldOptionService } from './field-option.service';

@Controller()
export class FieldOptionTcpController extends OptionTcpController {
	constructor(
		protected service: FieldOptionService,
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

	@EventPattern('field.content')
	async content(payload) {
		return await super.content(payload);
	}

	@EventPattern('field.updateContent')
	async updateContent(payload) {
		return await super.updateContent(payload);
	}
}
