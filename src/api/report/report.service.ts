import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import { PrepareParserService } from '../../queue/tasks/prepare-parser.service';
import { Report } from './report.entity';

@Injectable()
export class ReportService extends SqlService {
	protected entityName = 'report';
	protected entityConstructor = Report;
	protected entityWithTwoStepRemoval = true;

	constructor(
		@InjectRepository(Report) protected entityRepository: Repository<Report>,
		protected connection: Connection,
		protected cacheService: CacheService,
		protected prepareParserService: PrepareParserService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			contentId: true,
			fileId: true,
			reportStatusId: true,
			isDeleted: true,
			isNotDelete: true,
		});
	}

	protected oneGetColumns(customColumns: object = {}) {
		return ({ ...this.manyGetColumns(customColumns) });
	}

	protected manyGetQueryColumns(customColumns: object = {}) {
		return {
			...super.manyGetQueryColumns(customColumns),
			contentId: true,
			fileId: true,
			reportStatusId: true,
		};
	};

	protected async createAfter(initialPayload: object, processedPayload: object, data: any): Promise<any> {
		if (initialPayload['reportStatusId'] === 'cv-report-status-started') {
			this.prepareParserService.start({
				cvFileId: initialPayload['fileId'],
				cvReportId: initialPayload['id'],
			});
		}
		return await this.after(initialPayload, processedPayload, data);
	}
}
