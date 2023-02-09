import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController as NestDatumTcpController } from '@nest-datum-common/controller';
import { 
	str as utilsCheckStr,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName,
} from '@nest-datum-utils/check';
import { 
	checkToken,
	getUser, 
} from '@nest-datum/jwt';
import { FieldContentService } from './field-content.service';

@Controller()
export class FieldContentController extends NestDatumTcpController {
	constructor(
		public transportService: TransportService,
		public service: FieldContentService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['contentId'])) {
			throw new WarningException(`Property "contentId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['contentId'] && utilsCheckStrId(options['contentId'])) 
				? { contentId: options['contentId'] } 
				: {},
			...(options['fieldId'] && utilsCheckStrId(options['fieldId'])) 
				? { fieldId: options['fieldId'] } 
				: {},
			...(options['fieldName'] && utilsCheckStrName(options['fieldName'])) 
				? { fieldName: options['fieldName'] } 
				: {},
			...utilsCheckStr(options['value'])
				? { value: options['value'] } 
				: {},
		};
	}

	@MessagePattern({ cmd: 'fieldContent.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'fieldContent.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('fieldContent.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('fieldContent.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('fieldContent.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('fieldContent.update')
	async update(payload) {
		return await super.update(payload);
	}
}
