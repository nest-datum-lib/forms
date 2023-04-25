import { Controller } from '@nestjs/common';
import { OptionHttpController } from '@nest-datum/option';
import { FormOptionService } from './form-option.service';

@Controller(`${process.env.SERVICE_FORMS}/form-option`)
export class FormOptionHttpController extends OptionHttpController {
	constructor(
		protected service: FormOptionService,
	) {
		super();
	}
}
