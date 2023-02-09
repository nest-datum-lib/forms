import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService as NestDatumOptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FormFormOption } from './form-form-option.entity';

@Injectable()
export class FormFormOptionService extends NestDatumOptionOptionService {
	public entityName = 'formFormOption';
	public entityConstructor = FormFormOption;

	constructor(
		@InjectRepository(FormFormOption) public repository: Repository<FormFormOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}

	protected selectDefaultMany = {
		id: true,
		formId: true,
		formOptionId: true,
		createdAt: true,
		updatedAt: true,
	};
}
