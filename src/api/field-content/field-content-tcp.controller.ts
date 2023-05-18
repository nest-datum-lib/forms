import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { MethodNotAllowedException } from '@nest-datum-common/exceptions';
import { AccessToken } from '@nest-datum-common/decorators';
import { 
	exists as utilsCheckExists,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import { BindTcpController } from '@nest-datum/bind';
import { FieldContentService } from './field-content.service';

@Controller()
export class FieldContentTcpController extends BindTcpController {
	protected readonly mainRelationColumnName: string = 'contentId';
	protected readonly optionRelationColumnName: string = 'fieldId';
	
	constructor(
		protected service: FieldContentService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckExists(options['value'])) {
			throw new MethodNotAllowedException(`Property "value" is not valid.`);
		}
		if (!utilsCheckStrIdExists(options['userId'])) {
			throw new MethodNotAllowedException(`Property "userId" is not valid.`);
		}
		return {
			...await super.validateCreate(options),
			value: options['value'] ?? '',
			userId: options['userId'],
		};
	}

	async validateUpdate(options) {
		if (!utilsCheckExists(options['value'])) {
			throw new MethodNotAllowedException(`Property "value" is not valid.`);
		}
		if (!utilsCheckStrIdExists(options['fieldId'])) {
			throw new MethodNotAllowedException(`Property "fieldId" is not valid.`);
		}
		if (!utilsCheckStrIdExists(options['contentId'])) {
			throw new MethodNotAllowedException(`Property "contentId" is not valid.`);
		}
		if (!utilsCheckStrIdExists(options['userId'])) {
			throw new MethodNotAllowedException(`Property "userId" is not valid.`);
		}
		return {
			...await super.validateUpdate(options),
			fieldId: options['fieldId'],
			contentId: options['contentId'],
			value: options['value'] ?? '',
			userId: options['userId'],
		};
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

	@EventPattern('fieldContent.update')
	async update(payload) {
		return await super.create(payload);
	}
}
