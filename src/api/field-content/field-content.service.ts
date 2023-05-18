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

	protected manyGetColumns(customColumns: object = {}): object {
		return {
			...super.manyGetColumns(customColumns),
			fieldId: true,
			contentId: true,
			value: true,
		};
	}

	protected manyGetQueryColumns(customColumns: object = {}): object {
		return {
			...super.manyGetQueryColumns(customColumns),
			value: true,
		};
	}

	protected oneGetColumns(customColumns: object = {}): object {
		return {
			...super.oneGetColumns(customColumns),
			fieldId: true,
			contentId: true,
			value: true,
		};
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
					fieldStatusId: 'happ-forms-field-status-active',
					dataTypeId: 'happ-data-type-text',
					name: fieldName,
					description: 'Automatically created field during search.',
				}))
				: await this.fieldRepository.save({
					userId: process.env.USER_ID,
					fieldStatusId: 'happ-forms-field-status-active',
					dataTypeId: 'happ-data-type-text',
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

			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'field', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'formField', '*' ] });
			this.repositoryCache.drop({ key: [ this.prefix(process.env.APP_NAME), 'content', '*' ] });
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
		return processedPayload;
	}

	protected async manyProcess(processedPayload: object, payload: object): Promise<Array<Array<any> | number>> {
		const filterKeys = Object.keys(processedPayload['filter']);
		const sortKeys = Object.keys(processedPayload['sort']);

		console.log('>>>>', console.log(`SELECT
				\`id\`,
				\`userId\`,
				\`fieldId\`,
				\`contentId\`,
				\`value\`,
				\`createdAt\`,
				\`updatedAt\`,
				COUNT(\`value\`) as \`length\`
			FROM \`field_content\` 
			${filterKeys.length > 0
				? `WHERE ${filterKeys.map((key) => `\`fieldId\` = "${processedPayload['filter'][key]}"`).join('AND')}`
				: ''}
			${sortKeys.length > 0
				? `ORDER BY ${sortKeys.map((key) => `\`${key}\` ${processedPayload['sort'][key]}`).join(',')}`
				: ''}
			GROUP BY \`value\`
			HAVING \`length\` = 1
			${processedPayload['page']
				? `LIMIT ${processedPayload['page']}${processedPayload['limit']
					? ``
					: '20'}`
				: ''}${processedPayload['limit']
					? (processedPayload['page']
						? `,${processedPayload['limit']}`
						: `LIMIT ${processedPayload['limit']}`)
					: ''};`));

		return await super.manyProcess(processedPayload, payload);

		// if (this.withCache === true) {
		// 	const cachedData = await this.repositoryCache.one({ key: [ this.prefix(process.env.APP_NAME), 'many', processedPayload ] });

		// 	if (cachedData) {
		// 		return cachedData;
		// 	}
		// }
		// console.log('processedPayload', processedPayload, payload);

		// // await this.connection.query(`SELECT * FROM field_content WHERE `);

		// const condition = await this.findMany(processedPayload);
		// const output = await this.repository.findAndCount(condition);

		// if (this.withCache === true) {
		// 	await this.repositoryCache.create({ key: [ this.prefix(process.env.APP_NAME), 'many', processedPayload ], output });
		// }
		// return output;
	}
}
