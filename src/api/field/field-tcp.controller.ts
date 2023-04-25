import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { MethodNotAllowedException } from '@nest-datum-common/exceptions';
import { TcpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	strName as utilsCheckStrName, 
	strDescription as utilsCheckStrDescription,
	strFilled as utilsCheckStrFilled,
	strEmail as utilsCheckStrEmail,
} from '@nest-datum-utils/check';
import { FieldService } from './field.service';

@Controller()
export class FieldTcpController extends TcpController {
	constructor(
		protected service: FieldService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new MethodNotAllowedException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['fieldStatusId'])) {
			throw new MethodNotAllowedException(`Property "fieldStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['dataTypeId'])) {
			throw new MethodNotAllowedException(`Property "dataTypeId" is not valid.`);
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
		if (utilsCheckExists(options['fieldStatusId'])) {
			if (!utilsCheckStrId(options['fieldStatusId'])) {
				throw new MethodNotAllowedException(`Property "fieldStatusId" is not valid.`);
			}
			output['fieldStatusId'] = options['fieldStatusId'];
		}
		if (utilsCheckExists(options['dataTypeId'])) {
			if (!utilsCheckStrId(options['dataTypeId'])) {
				throw new MethodNotAllowedException(`Property "dataTypeId" is not valid.`);
			}
			output['dataTypeId'] = options['dataTypeId'];
		}
		if (utilsCheckExists(options['name'])) {
			if (!utilsCheckStrName(options['name'])) {
				throw new MethodNotAllowedException(`Property "name" is not valid.`);
			}
			output['name'] = options['name'];
		}
		if (utilsCheckExists(options['description'])) {
			if (!utilsCheckStrDescription(options['description'])) {
				throw new MethodNotAllowedException(`Property "description" is not valid.`);
			}
			output['description'] = options['description'];
		}
		return {
			...await super.validateUpdate(options),
			...output,
		};
	}

	@MessagePattern({ cmd: 'field.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'field.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('field.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('field.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('field.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('field.update')
	async update(payload: object = {}) {
		return await super.update(payload);
	}
}
