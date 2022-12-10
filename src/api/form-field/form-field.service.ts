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
import { FormField } from './form-field.entity';

@Injectable()
export class FormFieldService extends SqlService {
	constructor(
		@InjectRepository(FormField) private readonly formFieldRepository: Repository<FormField>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		formId: true,
		fieldId: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};

	async many({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'field', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formFieldRepository.findAndCount(await this.findMany(payload));

			this.cacheService.set([ 'form', 'field', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'field', 'one' , payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formFieldRepository.findOne(await this.findOne(payload));
		
			if (output) {
				this.cacheService.set([ 'form', 'field', 'one', payload ], output);
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

	async drop({ user, ...payload }): Promise<any> {
		try {
			this.cacheService.clear([ 'form', 'field', 'many' ]);
			this.cacheService.clear([ 'form', 'field', 'one', payload ]);

			await this.dropByIsDeleted(this.formFieldRepository, payload['id']);

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
			
			this.cacheService.clear([ 'form', 'field', 'many' ]);
			this.cacheService.clear([ 'form', 'field', 'one', payload ]);
			this.cacheService.clear([ 'form', 'many' ]);
			this.cacheService.clear([ 'field', 'many' ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.dropByIsDeleted(this.formFieldRepository, payload['ids'][i]);
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

	async create({ user, id, formId, fieldId }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();

			this.cacheService.clear([ 'form', 'field', 'many' ]);
			this.cacheService.clear([ 'form', 'many' ]);
			this.cacheService.clear([ 'field', 'many' ]);

			const userId = (user
				&& typeof user === 'object')
				? (user['id'] || '')
				: '';
			const formField = await this.formFieldRepository.save({
				id: id || uuidv4(),
				userId,
				formId,
				fieldId,
			});
			
			formField['userId'] = userId;

			await queryRunner.commitTransaction();

			return formField;
		}
		catch (err) {
			console.log('errr', err);

			await queryRunner.rollbackTransaction();
			await queryRunner.release();

			throw new ErrorException(err.message, getCurrentLine(), { user, id, formId, fieldId });
		}
		finally {
			await queryRunner.release();
		}
	}
}
