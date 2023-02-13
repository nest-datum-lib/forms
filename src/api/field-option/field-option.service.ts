import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldOption } from './field-option.entity';

@Injectable()
export class FieldOptionService extends OptionService {
	protected entityName = 'fieldOption';
	protected entityServicedName = 'field';
	protected entityId = 'fieldId';
	protected entityOptionId = 'fieldOptionId';
	protected entityOptionRelationId = 'fieldFieldOptionId';
	protected entityConstructor = FieldOption;
	protected entityOptionConstructor = FieldFieldOption;
	protected entityOptionRelationConstructor = FieldFieldFieldOption;

	constructor(
		@InjectRepository(FieldOption) protected entityRepository: Repository<FieldOption>,
		@InjectRepository(FieldFieldOption) protected entityOptionRepository: Repository<FieldFieldOption>,
		@InjectRepository(FieldFieldFieldOption) protected entityOptionRelationRepository: Repository<FieldFieldFieldOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
