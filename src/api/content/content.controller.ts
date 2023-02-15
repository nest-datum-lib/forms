import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController } from '@nest-datum/controller';
import { 
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import { ContentService } from './content.service';

@Controller()
export class ContentController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: ContentService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['contentStatusId'])) {
			throw new WarningException(`Property "contentStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['formId'])) {
			throw new WarningException(`Property "formId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['contentStatusId'] && utilsCheckStrId(options['contentStatusId'])) 
				? { contentStatusId: options['contentStatusId'] } 
				: {},
			...(options['formId'] && utilsCheckStrId(options['formId'])) 
				? { formId: options['formId'] } 
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

	@EventPattern('content.create')
	async create(payload) {
		console.log('>>>>>>>>>>>>>>>>', payload);

		return await super.create(payload);
	}

	@EventPattern('content.update')
	async update(payload) {
		return await super.update(payload);
	}
}
