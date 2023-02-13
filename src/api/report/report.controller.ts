import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { WarningException } from '@nest-datum-common/exceptions';
import { TransportService } from '@nest-datum/transport';
import { TcpController } from '@nest-datum/controller';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';
import { ReportService } from './report.service';

@Controller()
export class ReportController extends TcpController {
	constructor(
		protected transportService: TransportService,
		protected entityService: ReportService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['contentId'])) {
			throw new WarningException(`Property "contentId" is not valid.`);
		}
		if (!utilsCheckStrId(options['fileId'])) {
			throw new WarningException(`Property "fileId" is not valid.`);
		}
		if (!utilsCheckStrId(options['reportStatusId'])) {
			throw new WarningException(`Property "reportStatusId" is not valid.`);
		}
		return await this.validateUpdate(options);
	}

	async validateUpdate(options) {
		return {
			...await super.validateUpdate(options),
			...(options['reportStatusId'] && utilsCheckStrId(options['reportStatusId'])) 
				? { reportStatusId: options['reportStatusId'] } 
				: {},
			...(options['contentId'] && utilsCheckStrId(options['contentId'])) 
				? { contentId: options['contentId'] } 
				: {},
			...(options['fileId'] && utilsCheckStrId(options['fileId'])) 
				? { fileId: options['fileId'] } 
				: {},
		};
	}

	@MessagePattern({ cmd: 'report.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'report.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('report.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('report.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('report.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('report.update')
	async update(payload) {
		return await super.update(payload);
	}
}
