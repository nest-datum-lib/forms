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
import { Field } from './field.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';

@Injectable()
export class FieldService extends SqlService {
	constructor(
		@InjectRepository(Field) private readonly fieldRepository: Repository<Field>,
		@InjectRepository(FieldFieldOption) private readonly fieldFieldOptionRepository: Repository<FieldFieldOption>,
		@InjectRepository(FieldFieldFieldOption) private readonly fieldFieldFieldOptionRepository: Repository<FieldFieldFieldOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		fieldStatusId: true,
		dataTypeId: true,
		name: true,
		description: true,
		isRequired: true,
		isDeleted: true,
		isNotDelete: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'field', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fieldRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'field', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'field', 'one', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fieldRepository.findOne(await this.findOne(payload));
			
			if (output) {
				await this.cacheService.set([ 'field', 'one', payload ], output);
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
			this.cacheService.clear([ 'field', 'many' ]);
			this.cacheService.clear([ 'field', 'one', payload ]);

			await this.fieldFieldFieldOptionRepository.delete({ fieldId: payload['id'] });
			await this.fieldFieldOptionRepository.delete({ fieldId: payload['id'] });
			await this.dropByIsDeleted(this.fieldRepository, payload['id']);

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
			
			this.cacheService.clear([ 'field', 'many' ]);
			this.cacheService.clear([ 'field', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.fieldFieldFieldOptionRepository.delete({ fieldId: payload['ids'][i] });
				await this.fieldFieldOptionRepository.delete({ fieldId: payload['ids'][i] });
				await this.dropByIsDeleted(this.fieldRepository, payload['ids'][i]);
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
			
			this.cacheService.clear([ 'field', 'many' ]);

			const output = await this.fieldRepository.save({
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

	async createOptions({ user, id, data }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner();

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'field', 'option', 'many' ]);
			this.cacheService.clear([ 'field', 'many' ]);
			this.cacheService.clear([ 'field', 'one' ]);

			await this.fieldFieldFieldOptionRepository.delete({
				fieldId: id,
			});

			let i = 0,
				ii = 0;

			while (i < data.length) {
				ii = 0;

				const option = data[i];

				while (ii < option.length) {
					const {
						entityOptionId,
						entityId,
						id: itemId,
						...optionData
					} = option[ii];

					const output = await this.fieldFieldFieldOptionRepository.save({
						...optionData,
						fieldId: id,
						fieldFieldOptionId: entityOptionId,
					});

					ii++;
				}
				i++;
			}
			await queryRunner.commitTransaction();
			
			return true;
		}
		catch (err) {
			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, data });
		}
		finally {
			await queryRunner.release();
		}
	}

	async update({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'field', 'many' ]);
			this.cacheService.clear([ 'field', 'one' ]);
			
			await this.updateWithId(this.fieldRepository, payload);
			
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
