import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { BindService } from '@nest-datum/bind';
import { CacheService } from '@nest-datum/cache';
import { FormFormOption } from './form-form-option.entity';


export class FormFormOptionService extends BindService {
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'formOptionId';
	protected repositoryConstructor = FormFormOption;
	
	constructor(
		@InjectRepository(FormFormOption) protected repository: Repository<FormFormOption>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
