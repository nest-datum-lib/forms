import { Controller } from '@nestjs/common';
import { BindHttpTcpController } from '@nest-datum/bind';
import { TransportService } from '@nest-datum/transport';

@Controller(`${process.env.SERVICE_FORMS}/form/field`)
export class FormFieldHttpTcpController extends BindHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'formField';
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'fieldId';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}
}
