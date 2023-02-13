import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FormFormOption } from './form-form-option.entity';

@Injectable()
export class FormFormOptionService extends OptionOptionService {
	protected entityName = 'formFormOption';
	protected entityConstructor = FormFormOption;
	protected entityOptionId = 'formOptionId';
	protected entityId = 'formId';

	constructor(
		@InjectRepository(FormFormOption) protected entityRepository: Repository<FormFormOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
