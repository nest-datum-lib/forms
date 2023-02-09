import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
	Like,
} from 'typeorm';
import { ErrorException } from '@nest-datum-common/exceptions';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import { Content } from '../content/content.entity';
import { Field } from '../field/field.entity';
import { FormField } from '../form-field/form-field.entity';
import { FieldContent } from './field-content.entity';

@Injectable()
export class FieldContentService extends SqlService {
	public entityName = 'fieldContent';
	public entityConstructor = FieldContent;

	constructor(
		@InjectRepository(FieldContent) public repository: Repository<FieldContent>,
		@InjectRepository(Field) public fieldRepository: Repository<Field>,
		@InjectRepository(Content) public contentRepository: Repository<Content>,
		@InjectRepository(FormField) public formFieldRepository: Repository<FormField>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		fieldId: true,
		contentId: true,
		value: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};

	async create(payload: object = {}): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			delete payload['accessToken'];
			delete payload['refreshToken'];
			
			this.cacheService.clear([ this.entityName, 'many' ]);

			if (!payload['fieldId'] && payload['fieldName']) {
				const content = await this.contentRepository.findOne({
					select: {
						id: true,
						formId: true,
					},
					where: {
						id: payload['contentId'],
					},
				});

				if (!content) {
					return new Error(`Content entity with id "${payload['contentId']}" is undefined`);
				}
				let field = await this.fieldRepository.findOne({
					select: {
						id: true,
						name: true,
					},
					where: {
						name: Like(`%${payload['fieldName']}%`),
						formFields: {
							formId: content['formId'],
						},
					},
				});
				if (!field) {
					field = await queryRunner.manager.save(Object.assign(new Field, {
						userId: payload['userId'],
						fieldStatusId: 'forms-field-status-active',
						dataTypeId: 'data-type-type-text',
						name: payload['fieldName'],
						description: 'Created by field name.',
					}));

					if (!field) {
						return new Error('Field entity is undefined');
					}
					await queryRunner.manager.save(Object.assign(new FormField, {
						userId: payload['userId'],
						formId: content['formId'],
						fieldId: field['id'],
					}));
				}
				delete payload['fieldName'];
				payload['fieldId'] = field['id'];
			}
			const output = await queryRunner.manager.save(Object.assign(new FieldContent, {
				...payload,
				userId: payload['userId'],
			}));

			await queryRunner.commitTransaction();

			return output;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			throw new ErrorException(err.message);
		}
		finally {
			await queryRunner.release();
		}
	}
}
