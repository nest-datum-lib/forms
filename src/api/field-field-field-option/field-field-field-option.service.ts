import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { CacheService } from '@nest-datum/cache';
import { ManyService } from '@nest-datum/many';
import { FieldFieldFieldOption } from './field-field-field-option.entity';

@Injectable()
export class FieldFieldFieldOptionService extends ManyService {
	protected readonly mainRelationColumnName: string = 'fieldId';
	protected readonly optionRelationColumnName: string = 'fieldFieldOptionId';
	protected readonly repositoryConstructor = FieldFieldFieldOption;

	constructor(
		@InjectRepository(FieldFieldFieldOption) protected readonly repository: Repository<FieldFieldFieldOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
