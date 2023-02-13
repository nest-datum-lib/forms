import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { FormStatus } from './form-status.entity';

@Injectable()
export class FormStatusService extends StatusService {
	protected entityName = 'formStatus';
	protected entityConstructor = FormStatus;

	constructor(
		@InjectRepository(FormStatus) protected entityRepository: Repository<FormStatus>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
