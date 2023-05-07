import { 
	Post,
	Patch,
	Body,
	Param,
} from '@nestjs/common';
import { MethodNotAllowedException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { BindHttpTcpController } from '@nest-datum/bind';
import { TransportService } from '@nest-datum/transport';
import { 
	exists as utilsCheckExists,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';

@Controller(`${process.env.SERVICE_FORMS}/field/content`)
export class FieldContentHttpTcpController extends BindHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'fieldContent';
	protected readonly mainRelationColumnName: string = 'contentId';
	protected readonly optionRelationColumnName: string = 'fieldId';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckExists(options['value'])) {
			throw new MethodNotAllowedException(`Property "value" is not valid.`);
		}
		return {
			...await super.validateCreate(options),
			value: String(options['value']),
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
		return {
			...await super.validateUpdate(options),
			fieldId: options['fieldId'],
			contentId: options['contentId'],
			value: String(options['value']),
		};
	}

	@Post(':id')
	async create(
		@AccessToken() accessToken: string,
		@Param('id') entityId: string,
		@Body() body,
	) {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.create`,
		}, await this.validateCreate({
			accessToken,
			value: body['value'],
			[this.mainRelationColumnName]: entityId,
			[this.optionRelationColumnName]: body['fieldId'],
		})));
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body() body,
	) {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.update`,
		}, await this.validateUpdate({
			accessToken,
			id,
			value: body['value'],
			fieldId: body['fieldId'],
			contentId: body['contentId'],
		})));
	}
}
