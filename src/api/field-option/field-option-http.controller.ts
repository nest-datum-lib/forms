import { Controller } from '@nestjs/common';
import { OptionHttpController } from '@nest-datum/option';
import { FieldOptionService } from './field-option.service';

@Controller(`${process.env.SERVICE_FORMS}/field-option`)
export class FieldOptionHttpController extends OptionHttpController {
	constructor(
		protected service: FieldOptionService,
	) {
		super();
	}
}
