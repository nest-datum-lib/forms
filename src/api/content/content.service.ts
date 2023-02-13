import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import { Content } from './content.entity';

@Injectable()
export class ContentService extends SqlService {
	protected entityName = 'content';
	protected entityConstructor = Content;

	constructor(
		@InjectRepository(Content) protected entityRepository: Repository<Content>,
		protected connection: Connection,
		protected cacheService: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}) {
		return ({
			...super.manyGetColumns(customColumns),
			userId: true,
			contentStatusId: true,
			formId: true,
			isDeleted: true,
			isNotDelete: true,
		});
	}

	protected oneGetColumns(customColumns: object = {}) {
		return ({
			...this.manyGetColumns(customColumns),
		});
	}
}
