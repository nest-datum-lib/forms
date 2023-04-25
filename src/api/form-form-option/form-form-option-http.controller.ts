import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { FormFormOptionService } from './form-form-option.service';

@Controller(`${process.env.SERVICE_FORMS}/form/option`)
export class FormFormOptionHttpController extends BindHttpController {
	constructor(
		protected service: FormFormOptionService,
	) {
		super();
	}
}
