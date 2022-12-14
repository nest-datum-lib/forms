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
import { FormOption } from './form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';

@Injectable()
export class FormOptionService extends SqlService {
	constructor(
		@InjectRepository(FormOption) private readonly formOptionRepository: Repository<FormOption>,
		@InjectRepository(FormFormOption) private readonly formFormOptionRepository: Repository<FormFormOption>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		name: true,
		description: true,
		dataTypeId: true,
		defaultValue: true,
		regex: true,
		isMultiline: true,
		isRequired: true,
		isDeleted: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
		defaultValue: true,
		regex: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'option', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formOptionRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'form', 'option', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}
		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'option', 'one', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formOptionRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'form', 'option', 'one', payload ], output);
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
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'form', 'option', 'many' ]);
			await this.cacheService.clear([ 'form', 'option', 'one', payload ]);

			await this.formFormOptionRepository.delete({ formOptionId: payload['id'] });
			await this.dropByIsDeleted(this.formOptionRepository, payload['id']);

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

	async dropMany({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			await this.cacheService.clear([ 'form', 'option', 'many' ]);
			await this.cacheService.clear([ 'form', 'option', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.formFormOptionRepository.delete({ formOptionId: payload['ids'][i] });
				await this.dropByIsDeleted(this.formOptionRepository, payload['ids'][i]);
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
			await this.cacheService.clear([ 'form', 'option', 'many' ]);

			const output = await this.formOptionRepository.save({
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
			await this.cacheService.clear([ 'form', 'option', 'many' ]);
			await this.cacheService.clear([ 'form', 'option', 'one' ]);
			
			await this.updateWithId(this.formOptionRepository, payload);
			
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
