import { Controller } from '@nestjs/common';
import { StatusHttpController } from '@nest-datum/status';
import { FieldStatusService } from './field-status.service';

@Controller(`${process.env.SERVICE_FORMS}/field-status`)
export class FieldStatusHttpController extends StatusHttpController {
	constructor(
		protected service: FieldStatusService,
	) {
		super();
	}
}
