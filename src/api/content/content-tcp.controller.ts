import { Controller } from '@nestjs/common';
import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { MethodNotAllowedException } from '@nest-datum-common/exceptions';
import { TcpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strDescription as utilsCheckStrDescription,
	strFilled as utilsCheckStrFilled,
	strEmail as utilsCheckStrEmail,
	str as utilsCheckStr,
} from '@nest-datum-utils/check';
import { ContentService } from './content.service';

@Controller()
export class ContentTcpController extends TcpController {
	constructor(
		protected service: ContentService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['contentStatusId'])) {
			throw new MethodNotAllowedException(`Property "contentStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['formId'])) {
			throw new MethodNotAllowedException(`Property "formId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		const output = {};

		if (utilsCheckExists(options['userId'])) {
			if (!utilsCheckStrId(options['userId'])) {
				throw new MethodNotAllowedException(`Property "userId" is not valid.`);
			}
			output['userId'] = options['userId'];
		}
		if (utilsCheckExists(options['formId'])) {
			if (!utilsCheckStrId(options['formId'])) {
				throw new MethodNotAllowedException(`Property "formId" is not valid.`);
			}
			output['formId'] = options['formId'];
		}
		if (utilsCheckExists(options['contentStatusId'])) {
			if (!utilsCheckStrId(options['contentStatusId'])) {
				throw new MethodNotAllowedException(`Property "contentStatusId" is not valid.`);
			}
			output['contentStatusId'] = options['contentStatusId'];
		}
		return {
			...await super.validateUpdate(options),
			...output,
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
	async create(payload: object = {}) {
		return await super.create(payload);
	}

	@EventPattern('content.update')
	async update(payload: object = {}) {
		return await super.update(payload);
	}
}
