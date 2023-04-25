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
	protected readonly entityName: string = 'contentStatus';
	protected readonly repositoryConstructor = ContentStatus;

	constructor(
		@InjectRepository(ContentStatus) protected readonly repository: Repository<ContentStatus>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}
}
