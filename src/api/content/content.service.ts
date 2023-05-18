import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { PrimaryService } from '@nest-datum/primary';
import { CacheService } from '@nest-datum/cache';
import { FieldContent } from '../field-content/field-content.entity';
import { Content } from './content.entity';

@Injectable()
export class ContentService extends PrimaryService {
	protected readonly withTwoStepRemoval: boolean = true;
	protected readonly withEnvKey: boolean = false;
	protected readonly repositoryConstructor = Content;

	constructor(
		@InjectRepository(Content) protected readonly repository: Repository<Content>,
		@InjectRepository(FieldContent) protected readonly fieldContentRepository: Repository<FieldContent>,
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

	protected async createBefore(payload): Promise<any> {
		const contents = await this.repository.find({
			relations: {
				fieldContents: true,
			},
			where: {
				formId: payload['formId'],
				userId: payload['userId'],
			},
		});
		let i = 0;

		while (i < contents.length) {
			let ii = 0,
				fieldContents = contents[i]['fieldContents'];

			while (ii < fieldContents.length) {
				console.log('fieldContents[ii]', fieldContents[ii]);

				await this.fieldContentRepository.delete({ id: fieldContents[ii]['id'] });
				ii++;
			}
			await this.repository.delete({ id: contents[i]['id'] });
			i++;
		}
		return await super.createBefore(payload);
	}
}
