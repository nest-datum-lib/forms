import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpOptionController as NestDatumTcpOptionController } from '@nest-datum-common/controller';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';
import { ContentService } from './content.service';

@Controller()
export class ContentController extends NestDatumTcpOptionController {
	constructor(
		public transportService: TransportService,
		public service: ContentService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['contentStatusId'])) {
			throw new WarningException(`Property "contentStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['contentStatusId'] && utilsCheckStrId(options['contentStatusId'])) 
				? { contentStatusId: options['contentStatusId'] } 
				: {},
		};
	}

	@MessagePattern({ cmd: 'content.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'content.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('content.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('content.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('content.createOptions')
	async createOptions(payload) {
		return await super.createOptions(payload);
	}

	@EventPattern('content.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('content.update')
	async update(payload) {
		return await super.update(payload);
	}
}
