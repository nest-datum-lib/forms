import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionService as NestDatumOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldOption } from './field-option.entity';

@Injectable()
export class FieldOptionService extends NestDatumOptionService {
	public entityName = 'fieldOption';
	public entityColumnOption = 'fieldOptionId';
	public entityConstructor = FieldOption;

	constructor(
		@InjectRepository(FieldOption) public repository: Repository<FieldOption>,
		@InjectRepository(FieldFieldOption) public repositoryOptionOption: Repository<FieldFieldOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, repositoryOptionOption, connection, cacheService);
	}
}
