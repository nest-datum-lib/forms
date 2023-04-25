import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from './form-option.entity';

@Injectable()
export class FormOptionService extends OptionService {
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'formOptionId';
	protected readonly optionContentColumnName: string = 'formFormOptionId';
	protected readonly repositoryConstructor = FormOption;
	protected readonly repositoryOptionConstructor = FormFormOption;
	protected readonly repositoryContentOptionConstructor = FormFormFormOption;

	constructor(
		@InjectRepository(FormOption) protected readonly repository: Repository<FormOption>,
		@InjectRepository(FormFormOption) public readonly repositoryOption: Repository<FormFormOption>,
		@InjectRepository(FormFormFormOption) public readonly repositoryContentOption: Repository<FormFormFormOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
