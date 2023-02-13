import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FormOption } from './form-option.entity';

@Injectable()
export class FormOptionService extends OptionService {
	protected entityName = 'formOption';
	protected entityServicedName = 'form';
	protected entityId = 'formId';
	protected entityOptionId = 'formOptionId';
	protected entityOptionRelationId = 'formFormOptionId';
	protected entityConstructor = FormOption;
	protected entityOptionConstructor = FormFormOption;
	protected entityOptionRelationConstructor = FormFormFormOption;

	constructor(
		@InjectRepository(FormOption) protected entityRepository: Repository<FormOption>,
		@InjectRepository(FormFormOption) protected entityOptionRepository: Repository<FormFormOption>,
		@InjectRepository(FormFormFormOption) protected entityOptionRelationRepository: Repository<FormFormFormOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
