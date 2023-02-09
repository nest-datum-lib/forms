import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService as NestDatumStatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { FieldStatus } from './field-status.entity';

@Injectable()
export class FieldStatusService extends NestDatumStatusService {
	public entityConstructor = FieldStatus;

	constructor(
		@InjectRepository(FieldStatus) public repository: Repository<FieldStatus>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}
}
