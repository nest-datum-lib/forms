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
import { FieldFieldOption } from './field-field-option.entity';

@Injectable()
export class FieldFieldOptionService extends SqlService {
	constructor(
		@InjectRepository(FieldFieldOption) private readonly fieldFieldOptionRepository: Repository<FieldFieldOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		fieldId: true,
		fieldOptionId: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'field', 'option', 'relation', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fieldFieldOptionRepository.findAndCount(await this.findMany(payload));

			this.cacheService.set([ 'field', 'option', 'relation', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'field', 'option', 'relation', 'one' , payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.fieldFieldOptionRepository.findOne(await this.findOne(payload));
		
			if (output) {
				this.cacheService.set([ 'field', 'option', 'relation', 'one', payload ], output);
			}
			else {
				return new NotFoundException('Entity is undefined', getCurrentLine(), { user, ...payload });
			}
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
	}

	async drop({ user, id }): Promise<any> {
		try {
			this.cacheService.clear([ 'field', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'field', 'option', 'relation', 'one', id ]);
			this.cacheService.clear([ 'field', 'option', 'many' ]);
			this.cacheService.clear([ 'field', 'option', 'one' ]);
			this.cacheService.clear([ 'field', 'one' ]);

			await this.fieldFieldOptionRepository.delete({ id });

			return true;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, id });
		}
	}

	async dropMany({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'field', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'field', 'option', 'relation', 'one', payload ]);
			this.cacheService.clear([ 'field', 'option', 'many' ]);
			this.cacheService.clear([ 'field', 'many' ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.dropByIsDeleted(this.fieldFieldOptionRepository, payload['ids'][i]);
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

	async create({ user, id, fieldId, fieldOptionId }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			this.cacheService.clear([ 'field', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'field', 'option', 'many' ]);
			this.cacheService.clear([ 'field', 'option', 'one' ]);
			this.cacheService.clear([ 'field', 'many' ]);
			this.cacheService.clear([ 'field', 'one' ]);

			const userId = (user
				&& typeof user === 'object')
				? (user['id'] || '')
				: '';
			const fieldOptionRelation = await this.fieldFieldOptionRepository.save({
				id: id || uuidv4(),
				userId,
				fieldId,
				fieldOptionId,
			});
			
			fieldOptionRelation['userId'] = userId;

			await queryRunner.commitTransaction();

			return fieldOptionRelation;
		}
		catch (err) {
			console.log('errr', err);

			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, fieldId, fieldOptionId });
		}
		finally {
			await queryRunner.release();
		}
	}
}
