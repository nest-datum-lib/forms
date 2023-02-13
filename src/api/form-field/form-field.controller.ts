import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { 
	Controller,
	ForbiddenException, 
} from '@nestjs/common';
import { TransportService } from '@nest-datum/transport';
import { TcpController } from '@nest-datum/controller';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { FormFieldService } from './form-field.service';

@Controller()
export class FormFieldController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: FormFieldService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['formId'])) {
			throw new ForbiddenException(`Property "formId" is not valid.`);
		}
		if (!utilsCheckStrId(options['fieldId'])) {
			throw new ForbiddenException(`Property "fieldId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['formId'] && utilsCheckStrId(options['formId'])) 
				? { formId: options['formId'] } 
				: {},
			...(options['fieldId'] && utilsCheckStrId(options['fieldId'])) 
				? { fieldId: options['fieldId'] } 
				: {},
		};
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

	@EventPattern('formField.update')
	async update(payload) {
		return await super.update(payload);
	}
}
