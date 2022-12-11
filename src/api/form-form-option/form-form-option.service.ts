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
import { FormFormOption } from './form-form-option.entity';

@Injectable()
export class FormFormOptionService extends SqlService {
	constructor(
		@InjectRepository(FormFormOption) private readonly formFormOptionRepository: Repository<FormFormOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		formId: true,
		formOptionId: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'option', 'relation', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formFormOptionRepository.findAndCount(await this.findMany(payload));

			this.cacheService.set([ 'form', 'option', 'relation', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'option', 'relation', 'one' , payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formFormOptionRepository.findOne(await this.findOne(payload));
		
			if (output) {
				this.cacheService.set([ 'form', 'option', 'relation', 'one', payload ], output);
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
			this.cacheService.clear([ 'form', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'form', 'option', 'relation', 'one', id ]);
			this.cacheService.clear([ 'form', 'option', 'many' ]);
			this.cacheService.clear([ 'form', 'option', 'one' ]);
			this.cacheService.clear([ 'form', 'one' ]);

			await this.formFormOptionRepository.delete({ id });

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
			
			this.cacheService.clear([ 'form', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'form', 'option', 'relation', 'one', payload ]);
			this.cacheService.clear([ 'form', 'option', 'many' ]);
			this.cacheService.clear([ 'form', 'many' ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.dropByIsDeleted(this.formFormOptionRepository, payload['ids'][i]);
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

	async create({ user, id, formId, formOptionId }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			console.log('user, id, formId, formOptionId', user, id, formId, formOptionId);

			await queryRunner.startTransaction();

			this.cacheService.clear([ 'form', 'option', 'relation', 'many' ]);
			this.cacheService.clear([ 'form', 'option', 'many' ]);
			this.cacheService.clear([ 'form', 'option', 'one' ]);
			this.cacheService.clear([ 'form', 'many' ]);
			this.cacheService.clear([ 'form', 'one' ]);

			const userId = (user
				&& typeof user === 'object')
				? (user['id'] || '')
				: '';
			console.log('userId', userId);
			const formOptionRelation = await this.formFormOptionRepository.save({
				id: id || uuidv4(),
				userId,
				formId,
				formOptionId,
			});
			console.log('formOptionRelation', formOptionRelation);
			
			formOptionRelation['userId'] = userId;

			await queryRunner.commitTransaction();

			return formOptionRelation;
		}
		catch (err) {
			console.log('errr', err);

			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, formId, formOptionId });
		}
		finally {
			await queryRunner.release();
		}
	}
}
