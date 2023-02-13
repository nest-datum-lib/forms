import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FormField } from './form-field.entity';

@Injectable()
export class FormFieldService extends OptionOptionService {
	protected entityName = 'formField';
	protected entityConstructor = FormField;
	protected entityOptionId = 'fieldId';
	protected entityId = 'formId';

	constructor(
		@InjectRepository(FormField) protected entityRepository: Repository<FormField>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
