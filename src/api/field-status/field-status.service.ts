import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { FieldStatus } from './field-status.entity';

@Injectable()
export class FieldStatusService extends StatusService {
	protected entityName = 'fieldStatus';
	protected entityConstructor = FieldStatus;

	constructor(
		@InjectRepository(FieldStatus) protected entityRepository: Repository<FieldStatus>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
