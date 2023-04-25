import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BindTcpController } from '@nest-datum/bind';
import { FieldContentService } from './field-content.service';

@Controller()
export class FieldContentTcpController extends BindTcpController {
	constructor(
		protected service: FieldContentService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'fieldContent.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'fieldContent.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('fieldContent.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('fieldContent.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('fieldContent.create')
	async create(payload) {
		return await super.create(payload);
	}
}
