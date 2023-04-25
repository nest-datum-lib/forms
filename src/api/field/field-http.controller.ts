import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	MethodNotAllowedException,
} from '@nestjs/common';
import { checkToken } from '@nest-datum-common/jwt';
import { AccessToken } from '@nest-datum-common/decorators';
import { MainHttpController } from '@nest-datum/main';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
	strFilled as utilsCheckStrFilled,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';
import { FieldFieldOptionService } from '../field-field-option/field-field-option.service';
import { FieldFieldFieldOptionService } from '../field-field-field-option/field-field-field-option.service';
import { FieldService } from './field.service';

@Controller(`${process.env.SERVICE_FORMS}/field`)
export class FieldHttpController extends MainHttpController {
	protected readonly mainRelationColumnName: string = 'fieldId';
	protected readonly optionRelationColumnName: string = 'fieldOptionId';

	constructor(
		protected service: FieldService,
		protected readonly serviceOptionContent: FieldFieldFieldOptionService,
		protected readonly serviceOptionRelation: FieldFieldOptionService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['fieldStatusId'])) {
			throw new MethodNotAllowedException(`Property "fieldStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['dataTypeId'])) {
			throw new MethodNotAllowedException(`Property "dataTypeId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		const output = {};

		if (utilsCheckExists(options['fieldStatusId'])) {
			if (!utilsCheckStrId(options['fieldStatusId'])) {
				throw new MethodNotAllowedException(`Property "fieldStatusId" is not valid.`);
			}
			output['fieldStatusId'] = options['fieldStatusId'];
		}
		if (utilsCheckExists(options['dataTypeId'])) {
			if (!utilsCheckStrId(options['dataTypeId'])) {
				throw new MethodNotAllowedException(`Property "dataTypeId" is not valid.`);
			}
			output['dataTypeId'] = options['dataTypeId'];
		}
		if (utilsCheckExists(options['name'])) {
			if (!utilsCheckStrName(options['name'])) {
				throw new MethodNotAllowedException(`Property "name" is not valid.`);
			}
			output['name'] = options['name'];
		}
		if (utilsCheckExists(options['description'])) {
			if (!utilsCheckStrDescription(options['description'])) {
				throw new MethodNotAllowedException(`Property "description" is not valid.`);
			}
			output['description'] = options['description'];
		}
		return {
			...await super.validateUpdate(options),
			...output,
		};
	}

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('fieldStatusId') fieldStatusId: string,
		@Body('dataTypeId') dataTypeId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			userId,
			fieldStatusId,
			dataTypeId,
			name,
			description,
			isNotDelete,
		})));
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('userId') userId: string,
		@Body('fieldStatusId') fieldStatusId: string,
		@Body('dataTypeId') dataTypeId: string,
		@Body('name') name: string,
		@Body('description') description: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate({
			accessToken,
			id,
			newId,
			userId,
			fieldStatusId,
			dataTypeId,
			name,
			description,
			isNotDelete,
			isDeleted,
		})));
	}
}
