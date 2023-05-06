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
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly withEnvKey: boolean = false;
	protected readonly repositoryConstructor = Content;

	constructor(
		@InjectRepository(Content) protected readonly repository: Repository<Content>,
		protected readonly connection: Connection,
		protected readonly repositoryCache: CacheService,
	) {
		super();
	}

	protected manyGetColumns(customColumns: object = {}): object {
		return {
			...super.manyGetColumns(customColumns),
			userId: true,
			contentStatusId: true,
			formId: true,
			isNotDelete: true,
		};
	}

	protected manyGetQueryColumns(customColumns: object = {}): object {
		return {
			...super.manyGetQueryColumns(customColumns),
			userId: true,
			contentStatusId: true,
			formId: true,
			isNotDelete: true,
		};
	}

	protected oneGetColumns(customColumns: object = {}): object {
		return {
			...super.oneGetColumns(customColumns),
			userId: true,
			contentStatusId: true,
			formId: true,
			isNotDelete: true,
		};
	}
}
