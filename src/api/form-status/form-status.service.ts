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
	protected readonly entityName: string = 'formStatus';
	protected readonly repositoryConstructor = FormStatus;

	constructor(
		@InjectRepository(FormStatus) protected readonly repository: Repository<FormStatus>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
