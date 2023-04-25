import { Controller } from '@nestjs/common';
import { StatusHttpTcpController } from '@nest-datum/status';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FORMS}/field-status`)
export class FieldStatusHttpTcpController extends StatusHttpTcpController {
	protected serviceName = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'fieldStatus';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
