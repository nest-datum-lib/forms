import { 
	Post,
	Patch,
	Body,
	Param,
} from '@nestjs/common';
import { MethodNotAllowedException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { BindHttpController } from '@nest-datum/bind';
import { 
	exists as utilsCheckExists,
	strIdExists as utilsCheckStrIdExists, 
} from '@nest-datum-utils/check';
import { FieldContentService } from './field-content.service';

@Controller(`${process.env.SERVICE_FORMS}/field/content`)
export class FieldContentHttpController extends BindHttpController {
	protected readonly mainRelationColumnName: string = 'contentId';
	protected readonly optionRelationColumnName: string = 'fieldId';
	
	async validateCreate(options) {
		if (!utilsCheckExists(options['value'])) {
			throw new MethodNotAllowedException(`Property "value" is not valid.`);
		}
		return {
			...await super.validateCreate(options),
			value: options['value'] ?? '',
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
			value: options['value'] ?? '',
		};
	}

	@Post(':id')
	async create(
		@AccessToken() accessToken: string,
		@Param('id') entityId: string,
		@Body() body,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
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
		return await this.serviceHandlerWrapper(async () => await this.service.udpate(await this.validateUpdate({
			accessToken,
			id,
			value: body['value'],
			fieldId: body['fieldId'],
			contentId: body['contentId'],
		})));
	}
}
