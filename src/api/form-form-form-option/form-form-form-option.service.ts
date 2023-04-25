import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { CacheService } from '@nest-datum/cache';
import { ManyService } from '@nest-datum/many';
import { FormFormFormOption } from './form-form-form-option.entity';

@Injectable()
export class FormFormFormOptionService extends ManyService {
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'formFormOptionId';
	protected readonly repositoryConstructor = FormFormFormOption;

	constructor(
		@InjectRepository(FormFormFormOption) protected readonly repository: Repository<FormFormFormOption>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
