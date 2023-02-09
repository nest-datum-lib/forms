import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { 
	ErrorException,
	WarningException, 
	NotFoundException,
} from '@nest-datum-common/exceptions';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import {
	encryptPassword,
	generateVerifyKey,
	generateTokens,
	checkPassword,
} from '@nest-datum/jwt';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from './field.entity';

@Injectable()
export class FieldService extends SqlService {
	public entityName = 'field';
	public entityConstructor = Field;
	public optionId = 'fieldId';
	public optionOptionId = 'fieldFieldOptionId';
	public optionRelationConstructor = FieldFieldFieldOption;

	constructor(
		@InjectRepository(Field) public repository: Repository<Field>,
		@InjectRepository(FieldFieldFieldOption) public repositoryOptionRelation: Repository<FieldFieldFieldOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		fieldStatusId: true,
		dataTypeId: true,
		name: true,
		description: true,
		isRequired: true,
		isDeleted: true,
		isNotDelete: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
		name: true,
		description: true,
	};
}
