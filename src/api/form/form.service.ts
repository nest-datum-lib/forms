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
import { Form } from './form.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FormField } from '../form-field/form-field.entity';

@Injectable()
export class FormService extends SqlService {
	constructor(
		@InjectRepository(Form) private readonly formRepository: Repository<Form>,
		@InjectRepository(FormFormFormOption) private readonly formFormFormOptionRepository: Repository<FormFormFormOption>,
		@InjectRepository(FormFormOption) private readonly formFormOptionRepository: Repository<FormFormOption>,
		@InjectRepository(FormField) private readonly formFieldRepository: Repository<FormField>,
		private readonly connection: Connection,
		private readonly cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		formStatusId: true,
		name: true,
		description: true,
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
			const cachedData = await this.cacheService.get([ 'form', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'form', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, ...payload });
		}

		return [ [], 0 ];
	}

	async manyFields({ user, id, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'many', payload ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formRepository.findAndCount(await this.findMany(payload));

			await this.cacheService.set([ 'form', 'many', payload ], output);
			
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), { user, id, ...payload });
		}

		return [ [], 0 ];
	}

	async one({ user, ...payload }): Promise<any> {
		try {
			const cachedData = await this.cacheService.get([ 'form', 'one', { user, ...payload } ]);

			if (cachedData) {
				return cachedData;
			}
			const output = await this.formRepository.findOne(await this.findOne(payload));
		
			if (output) {
				await this.cacheService.set([ 'form', 'one', payload ], output);
			}
			if (!output) {
				return new NotFoundException('Entity is undefined', getCurrentLine(), { user, ...payload });
			}
			return output;
		}
		catch (err) {
			throw new ErrorException(err.message, getCurrentLine(), payload);
		}
	}

	async drop({ user, ...payload }): Promise<any> {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			await queryRunner.startTransaction();
			
			this.cacheService.clear([ 'form', 'many' ]);
			this.cacheService.clear([ 'form', 'one', payload ]);

			await this.formFormFormOptionRepository.delete({ formId: payload['id'] });
			await this.formFormOptionRepository.delete({ formId: payload['id'] });
			await this.dropByIsDeleted(this.formRepository, payload['id']);

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
			
			this.cacheService.clear([ 'form', 'many' ]);
			this.cacheService.clear([ 'form', 'one', payload ]);

			let i = 0;

			while (i < payload['ids'].length) {
				await this.formFormFormOptionRepository.delete({ formId: payload['ids'][i] });
				await this.formFormOptionRepository.delete({ formId: payload['ids'][i] });
				await this.dropByIsDeleted(this.formRepository, payload['ids'][i]);
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
			
			this.cacheService.clear([ 'form', 'many' ]);

			const output = await this.formRepository.save({
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
			
			this.cacheService.clear([ 'form', 'many' ]);
			this.cacheService.clear([ 'form', 'one' ]);
			
			await this.updateWithId(this.formRepository, payload);
			
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
