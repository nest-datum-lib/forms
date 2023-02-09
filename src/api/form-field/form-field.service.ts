import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import { FormField } from './form-field.entity';

@Injectable()
export class FormFieldService extends SqlService {
	public entityName = 'formField';
	public entityConstructor = FormField;

	constructor(
		@InjectRepository(FormField) public repository: Repository<FormField>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		formId: true,
		fieldId: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};
}
