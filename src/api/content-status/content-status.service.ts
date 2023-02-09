import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService as NestDatumStatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { ContentStatus } from './content-status.entity';

@Injectable()
export class ContentStatusService extends NestDatumStatusService {
	public entityConstructor = ContentStatus;

	constructor(
		@InjectRepository(ContentStatus) public repository: Repository<ContentStatus>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super(repository, connection, cacheService);
	}
}
