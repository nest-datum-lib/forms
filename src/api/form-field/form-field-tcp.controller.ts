import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { BindTcpController } from '@nest-datum/bind';
import { FormFieldService } from './form-field.service';

@Controller()
export class FormFieldTcpController extends BindTcpController {
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'fieldId';

	constructor(
		protected service: FormFieldService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'formField.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'formField.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('formField.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('formField.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('formField.create')
	async create(payload) {
		return await super.create(payload);
	}
}
