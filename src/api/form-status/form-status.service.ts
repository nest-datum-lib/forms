import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService as NestDatumStatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { FormStatus } from './form-status.entity';

@Injectable()
export class FormStatusService extends NestDatumStatusService {
	public entityConstructor = FormStatus;

	constructor(
		@InjectRepository(FormStatus) public repository: Repository<FormStatus>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}
}
