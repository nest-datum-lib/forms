import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { CacheService } from '@nest-datum/cache';
import { OptionEntityService } from '@nest-datum/option';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from './field.entity';

@Injectable()
export class FieldService extends OptionEntityService {
	protected entityName = 'field';
	protected entityConstructor = Field;
	protected entityOptionConstructor = FieldFieldOption;
	protected entityId = 'fieldId';

	constructor(
		@InjectRepository(Field) protected entityRepository: Repository<Field>,
		@InjectRepository(FieldFieldOption) protected entityOptionRepository: Repository<FieldFieldOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			fieldStatusId: true,
			dataTypeId: true,
			name: true,
			description: true,
			isRequired: true,
			isDeleted: true,
			isNotDelete: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
			fromEmail: true,
			fromName: true,
		});
	}
}
