import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { StatusService } from '@nest-datum/status';
import { CacheService } from '@nest-datum/cache';
import { ReportStatus } from './report-status.entity';

@Injectable()
export class ReportStatusService extends StatusService {
	protected entityName = 'reportStatus';
	protected entityConstructor = ReportStatus;

	constructor(
		@InjectRepository(ReportStatus) protected entityRepository: Repository<ReportStatus>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}
}
