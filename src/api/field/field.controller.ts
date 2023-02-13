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
import { FieldService } from './field.service';

@Controller()
export class FieldController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: FieldService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['fieldStatusId'])) {
			throw new WarningException(`Property "fieldStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['dataTypeId'])) {
			throw new WarningException(`Property "dataTypeId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['fieldStatusId'] && utilsCheckStrId(options['fieldStatusId'])) 
				? { fieldStatusId: options['fieldStatusId'] } 
				: {},
			...(options['dataTypeId'] && utilsCheckStrId(options['dataTypeId'])) 
				? { dataTypeId: options['dataTypeId'] } 
				: {},
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
	async update(payload) {
		return await super.update(payload);
	}
}
