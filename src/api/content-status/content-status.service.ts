import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { ContentStatus } from './content-status.entity';

@Injectable()
export class ContentStatusService extends StatusService {
	protected entityName = 'contentStatus';
	protected entityConstructor = ContentStatus;

	constructor(
		@InjectRepository(ContentStatus) protected entityRepository: Repository<ContentStatus>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
