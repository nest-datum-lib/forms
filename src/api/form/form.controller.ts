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
import { FormService } from './form.service';

@Controller()
export class FormController extends NestDatumTcpOptionController {
	constructor(
		public transportService: TransportService,
		public service: FormService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrName(options['name'])) {
			throw new WarningException(`Property "name" is not valid.`);
		}
		if (!utilsCheckStrId(options['formStatusId'])) {
			throw new WarningException(`Property "formStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['formStatusId'] && utilsCheckStrId(options['formStatusId'])) 
				? { formStatusId: options['formStatusId'] } 
				: {},
		};
	}

	@MessagePattern({ cmd: 'form.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'form.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('form.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('form.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('form.createOptions')
	async createOptions(payload) {
		return await super.createOptions(payload);
	}

	@EventPattern('form.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('form.update')
	async update(payload) {
		return await super.update(payload);
	}
}
