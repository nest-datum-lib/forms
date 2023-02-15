import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
	Like,
} from 'typeorm';
import { NotFoundException } from '@nest-datum-common/exceptions';
import { OptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	objQueryRunner as utilsCheckObjQueryRunner,
} from '@nest-datum-utils/check';
import { Content } from '../content/content.entity';
import { Field } from '../field/field.entity';
import { FormField } from '../form-field/form-field.entity';
import { FieldContent } from './field-content.entity';

@Injectable()
export class FieldContentService extends OptionOptionService {
	protected entityName = 'fieldContent';
	protected entityConstructor = FieldContent;
	protected entityOptionId = 'contentId';
	protected entityId = 'fieldId';

	constructor(
		@InjectRepository(FieldContent) protected entityRepository: Repository<FieldContent>,
		@InjectRepository(Field) public fieldRepository: Repository<Field>,
		@InjectRepository(Content) public contentRepository: Repository<Content>,
		@InjectRepository(FormField) public formFieldRepository: Repository<FormField>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(),
			value: true,
		});
	}

	protected async getFieldByName(fieldName: string, contentId: string): Promise<any> {
		const content = await this.contentRepository.findOne({
			select: {
				id: true,
				formId: true,
			},
			where: {
				id: contentId,
			},
		});

		console.log('************************ getFieldByName')
		console.log('*')
		console.log('*')
		console.log('*', contentId, content)
		console.log('*')
		console.log('*')
		console.log('************************')

		if (!content) {
			throw new Error(`Content entity with id "${contentId}" is undefined.`);
		}
		let field = await this.fieldRepository.findOne({
			where: {
				name: Like(`%${fieldName}%`),
				formFields: {
					formId: content['formId'],
				},
			},
		});

		console.log('************************ field 111111')
		console.log('*')
		console.log('*')
		console.log('*', field['id'], field)
		console.log('*')
		console.log('*')
		console.log('************************')

		if (!field) {
			console.log('NNNNNNNNNNNNNNNNNNNNNNNNNNN', content, { ...(field || {}) }, field);

			field = (utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.save(Object.assign(new Field, {
					userId: process.env.USER_ID,
					fieldStatusId: 'forms-field-status-active',
					dataTypeId: 'data-type-type-text',
					name: fieldName,
					description: 'Automatically created field during search.',
				}))
				: await this.fieldRepository.save({
					userId: process.env.USER_ID,
					fieldStatusId: 'forms-field-status-active',
					dataTypeId: 'data-type-type-text',
					name: fieldName,
					description: 'Automatically created field during search.',
				});

			console.log('************************ field 222222222222')
			console.log('*')
			console.log('*')
			console.log('*', field)
			console.log('*')
			console.log('*')
			console.log('************************');

			(utilsCheckObjQueryRunner(this.queryRunner) 
				&& this.enableTransactions === true)
				? await this.queryRunner.manager.save(Object.assign(new FormField, {
					userId: process.env.USER_ID,
					formId: content['formId'],
					fieldId: field['id'],
				}))
				: await this.formFieldRepository.save({
					userId: process.env.USER_ID,
					formId: content['formId'],
					fieldId: field['id'],
				});
		}
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')
		console.log('>')
		console.log('>', (field || {})['id'])
		console.log('>')
		console.log('>', { ...(field || {}) }, ({ ...(field || {}) })['id'])
		console.log('>')
		console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.')

		return field['id'];
	}

	protected async createProperties(payload: object): Promise<any> {
		const processedPayload = await super.createProperties(payload);

		if (utilsCheckStrName(processedPayload['fieldName'])
			&& !utilsCheckStrId(processedPayload['fieldId'])) {
			return {
				fieldId: ((await this.getFieldByName(processedPayload['fieldName'], processedPayload['contentId'])) || {})['fieldId'],
				...processedPayload,
			};
		}
		return payload;
	}
}
