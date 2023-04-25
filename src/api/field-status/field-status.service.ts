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
	protected readonly entityName: string = 'fieldStatus';
	protected readonly repositoryConstructor = FieldStatus;

	constructor(
		@InjectRepository(FieldStatus) protected readonly repository: Repository<FieldStatus>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
