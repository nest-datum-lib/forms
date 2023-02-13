import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FieldFieldOption } from './field-field-option.entity';

@Injectable()
export class FieldFieldOptionService extends OptionOptionService {
	protected entityName = 'fieldFieldOption';
	protected entityConstructor = FieldFieldOption;
	protected entityOptionId = 'fieldOptionId';
	protected entityId = 'fieldId';

	constructor(
		@InjectRepository(FieldFieldOption) protected entityRepository: Repository<FieldFieldOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
