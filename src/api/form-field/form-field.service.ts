import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { BindService } from '@nest-datum/bind';
import { CacheService } from '@nest-datum/cache';
import { FormField } from './form-field.entity';

export class FormFieldService extends BindService {
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'fieldId';
	protected repositoryConstructor = FormField;
	
	constructor(
		@InjectRepository(FormField) protected repository: Repository<FormField>,
		protected connection: Connection,
		protected repositoryCache: CacheService,
	) {
		super();
	}
}
