import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController as NestDatumTcpController } from '@nest-datum-common/controller';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';
import { FormFieldService } from './form-field.service';

@Controller()
export class FormFieldController extends NestDatumTcpController {
	constructor(
		public transportService: TransportService,
		public service: FormFieldService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['formId'])) {
			throw new WarningException(`Property "formId" is not valid.`);
		}
		if (!utilsCheckStrId(options['fieldId'])) {
			throw new WarningException(`Property "fieldId" is not valid.`);
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
		console.log('payload', payload);

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
