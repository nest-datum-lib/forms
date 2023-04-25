import { Controller } from '@nestjs/common';
import { StatusHttpTcpController } from '@nest-datum/status';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FORMS}/content-status`)
export class ContentStatusHttpTcpController extends StatusHttpTcpController {
	protected serviceName = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'contentStatus';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
