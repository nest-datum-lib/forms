import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { CacheService } from '@nest-datum/cache';
import { OptionEntityService } from '@nest-datum/option';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from './form.entity';

@Injectable()
export class FormService extends OptionEntityService {
	protected entityName = 'form';
	protected entityConstructor = Form;
	protected entityOptionConstructor = FormFormOption;
	protected entityId = 'formId';

	constructor(
		@InjectRepository(Form) protected entityRepository: Repository<Form>,
		@InjectRepository(FormFormOption) protected entityOptionRepository: Repository<FormFormOption>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			formStatusId: true,
			name: true,
			description: true,
			isDeleted: true,
			isNotDelete: true,
		});
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return ({
			...super.manyGetQueryColumns(customColumns),
			name: true,
			description: true,
		});
	}
}
