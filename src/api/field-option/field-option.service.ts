import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from './field-option.entity';

@Injectable()
export class FieldOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'fieldId';
	protected readonly optionRelationColumnName: string = 'fieldOptionId';
	protected readonly optionContentColumnName: string = 'fieldFieldOptionId';
	protected readonly repositoryConstructor = FieldOption;
	protected readonly repositoryOptionConstructor = FieldFieldOption;
	protected readonly repositoryContentOptionConstructor = FieldFieldFieldOption;

	constructor(
		@InjectRepository(FieldOption) protected readonly repository: Repository<FieldOption>,
		@InjectRepository(FieldFieldOption) public readonly repositoryOption: Repository<FieldFieldOption>,
		@InjectRepository(FieldFieldFieldOption) public readonly repositoryContentOption: Repository<FieldFieldFieldOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
