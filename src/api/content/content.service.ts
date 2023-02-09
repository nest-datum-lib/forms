import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { 
	ErrorException,
	WarningException, 
	NotFoundException,
} from '@nest-datum-common/exceptions';
import { SqlService } from '@nest-datum/sql';
import { CacheService } from '@nest-datum/cache';
import {
	encryptPassword,
	generateVerifyKey,
	generateTokens,
	checkPassword,
} from '@nest-datum/jwt';
import { Content } from './content.entity';

@Injectable()
export class ContentService extends SqlService {
	public entityName = 'content';
	public entityConstructor = Content;

	constructor(
		@InjectRepository(Content) public repository: Repository<Content>,
		public connection: Connection,
		public cacheService: CacheService,
	) {
		super();
	}

	protected selectDefaultMany = {
		id: true,
		userId: true,
		contentStatusId: true,
		formId: true,
		isDeleted: true,
		isNotDelete: true,
		createdAt: true,
		updatedAt: true,
	};

	protected queryDefaultMany = {
		id: true,
	};
}
