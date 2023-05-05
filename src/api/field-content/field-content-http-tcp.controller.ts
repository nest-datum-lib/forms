import { Controller } from '@nestjs/common';
import { BindHttpTcpController } from '@nest-datum/bind';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FORMS}/field/content`)
export class FieldContentHttpTcpController extends BindHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'fieldContent';
	protected readonly mainRelationColumnName: string = 'fieldId';
	protected readonly optionRelationColumnName: string = 'contentId';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
