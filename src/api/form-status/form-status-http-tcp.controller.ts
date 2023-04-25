import { Controller } from '@nestjs/common';
import { StatusHttpTcpController } from '@nest-datum/status';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FORMS}/form-status`)
export class FormStatusHttpTcpController extends StatusHttpTcpController {
	protected serviceName = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'formStatus';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
