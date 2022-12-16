import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import getCurrentLine from 'get-current-line';
import { 
	Inject,
	Injectable, 
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from 'nest-datum/sql/src';
import { CacheService } from 'nest-datum/cache/src';
import { 
	ErrorException,
	NotFoundException, 
} from 'nest-datum/exceptions/src';
import { Content } from '../content/content.entity';
import { Field } from '../field/field.entity';
import { FieldContent } from './field-content.entity';

@Injectable()
export class FieldContentService extends SqlService {
	constructor(
		@InjectRepository(FieldContent) private readonly fieldContentRepository: Repository<FieldContent>,
		@InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
		@InjectRepository(Content) private readonly contentRepository: Repository<Content>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
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
		value: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'field', 'content', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fieldContentRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'field', 'content', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'field', 'content', 'one' , payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fieldContentRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'field', 'content', 'one', payload ], output);
			}
			if (!output) {
				return new NotFoundException('Entity is undefined', getCurrentLine(), { user, ...payload });
			}
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
	}

	async drop({ user, ...payload }): Promise<any> {
		try {
			this.cacheService.clear([ 'field', 'content', 'many' ]);
			this.cacheService.clear([ 'field', 'content', 'one', payload ]);

			await this.fieldContentRepository.delete({ id: payload['id'] });

			return true;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
	}

	async dropMany({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'field', 'content', 'many' ]);
			this.cacheService.clear([ 'field', 'content', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.fieldContentRepository.delete({ id: payload['ids'][i] });
				i++;
			}
			await queryRunner.commitTransaction();

			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async create({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'field', 'content', 'many' ]);

			if (!payload['fieldId']
				&& payload['fieldName']
				&& typeof payload['fieldName'] === 'string') {
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
					return new NotFoundException('Content entity is undefined', getCurrentLine(), { user, ...payload });
				}
				let field = await this.fieldRepository.findOne({
					where: {
						formId: content['formId'],
						name: Like(`%${payload['fieldName']}%`),
					},
				});

				if (!field) {
					field = await this.fieldRepository.save({
						userId: payload['userId'] || user['id'] || '',
						fieldStatusId: 'forms-field-status-active',
						dataTypeId: 'data-type-type-text',
						name: payload['fieldName'],
						description: 'Automatically created field by CV parser.',
					});
				}
				if (!field) {
					return new NotFoundException('Field entity is undefined', getCurrentLine(), { user, ...payload });
				}
				delete payload['fieldName'];
				payload['fieldId'] = field['id'];
			}
			const output = await this.fieldContentRepository.save({
				...payload,
				userId: payload['userId'] || user['id'] || '',
			});

			await queryRunner.commitTransaction();

			return output;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}

	async update({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'field', 'content', 'many' ]);
			this.cacheService.clear([ 'field', 'content', 'one' ]);
			
			await this.updateWithId(this.fieldContentRepository, payload);
			
			await queryRunner.commitTransaction();
			
			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		finally {
			await queryRunner.release();
		}
	}
}
