import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { FieldContentService } from './field-content.service';

@Controller(`${process.env.SERVICE_FORMS}/field/content`)
export class FieldContentHttpController extends BindHttpController {
	constructor(
		protected service: FieldContentService,
	) {
		super();
	}
}
