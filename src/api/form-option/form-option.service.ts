import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService as NestDatumOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FormOption } from './form-option.entity';

@Injectable()
export class FormOptionService extends NestDatumOptionService {
	public entityName = 'formOption';
	public entityColumnOption = 'formOptionId';
	public entityConstructor = FormOption;

	constructor(
		@InjectRepository(FormOption) public repository: Repository<FormOption>,
		@InjectRepository(FormFormOption) public repositoryOptionOption: Repository<FormFormOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, repositoryOptionOption, connection, cacheService);
	}
}
