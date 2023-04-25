import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { BindService } from '@nest-datum/bind';
import { CacheService } from '@nest-datum/cache';
import { FieldFieldOption } from './field-field-option.entity';


export class FieldFieldOptionService extends BindService {
	protected readonly mainRelationColumnName: string = 'fieldId';
	protected readonly optionRelationColumnName: string = 'fieldOptionId';
	protected repositoryConstructor = FieldFieldOption;
	
	constructor(
		@InjectRepository(FieldFieldOption) protected repository: Repository<FieldFieldOption>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
