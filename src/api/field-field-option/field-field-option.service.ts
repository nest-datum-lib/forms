import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { OptionOptionService as NestDatumOptionOptionService } from '@nest-datum/option';
import { CacheService } from '@nest-datum/cache';
import { FieldFieldOption } from './field-field-option.entity';

@Injectable()
export class FieldFieldOptionService extends NestDatumOptionOptionService {
	public entityName = 'fieldFieldOption';
	public entityConstructor = FieldFieldOption;

	constructor(
		@InjectRepository(FieldFieldOption) public repository: Repository<FieldFieldOption>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}

	protected selectDefaultMany = {
		id: true,
		fieldId: true,
		fieldOptionId: true,
		createdAt: true,
		updatedAt: true,
	};
}
