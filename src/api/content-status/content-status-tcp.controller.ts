import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { StatusTcpController } from '@nest-datum/status';
import { ContentStatusService } from './content-status.service';

@Controller()
export class ContentStatusTcpController extends StatusTcpController {
	constructor(
		protected service: ContentStatusService,
	) {
		super();
	}

	@MessagePattern({ cmd: 'contentStatus.many' })
	async many(payload) {
		return await super.many(payload);
	}

	@MessagePattern({ cmd: 'contentStatus.one' })
	async one(payload) {
		return await super.one(payload);
	}

	@EventPattern('contentStatus.drop')
	async drop(payload) {
		return await super.drop(payload);
	}

	@EventPattern('contentStatus.dropMany')
	async dropMany(payload) {
		return await super.dropMany(payload);
	}

	@EventPattern('contentStatus.create')
	async create(payload) {
		return await super.create(payload);
	}

	@EventPattern('contentStatus.update')
	async update(payload) {
		return await super.update(payload);
	}
}
