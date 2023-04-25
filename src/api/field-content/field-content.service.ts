import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
	Like,
} from 'typeorm';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	objQueryRunner as utilsCheckObjQueryRunner,
} from '@nest-datum-utils/check';
import { NotFoundException } from '@nest-datum-common/exceptions';
import { Content } from '../content/content.entity';
import { Field } from '../field/field.entity';
import { FormField } from '../form-field/form-field.entity';
import { BindService } from '@nest-datum/bind';
import { CacheService } from '@nest-datum/cache';
import { FieldContent } from './field-content.entity';

export class FieldContentService extends BindService {
	protected readonly mainRelationColumnName: string = 'contentId';
	protected readonly optionRelationColumnName: string = 'fieldId';
	protected repositoryConstructor = FieldContent;
	
	constructor(
		@InjectRepository(FieldContent) protected repository: Repository<FieldContent>,
		@InjectRepository(Field) public fieldRepository: Repository<Field>,
		@InjectRepository(Content) public contentRepository: Repository<Content>,
		@InjectRepository(FormField) public formFieldRepository: Repository<FormField>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
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

		if (!field) {
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

			this.repositoryCache.drop({ key: [ this.prefix(), 'field', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(), 'formField', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(), 'content', '*' ] });
		}
		return ({ ...(field || {}) })['id'];
	}

	protected async createProperties(payload: object): Promise<any> {
		const processedPayload = await super.createProperties(payload);

		if (utilsCheckStrName(processedPayload['fieldName'])
			&& !utilsCheckStrId(processedPayload['fieldId'])) {
			const fieldId = await this.getFieldByName(processedPayload['fieldName'], processedPayload['contentId']);

			return {
				...processedPayload,
				fieldId,
			};
		}
		return payload;
	}
}
