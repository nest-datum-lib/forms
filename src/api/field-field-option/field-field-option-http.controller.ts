import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { FieldFieldOptionService } from './field-field-option.service';

@Controller(`${process.env.SERVICE_FORMS}/field/option`)
export class FieldFieldOptionHttpController extends BindHttpController {
	protected readonly mainRelationColumnName: string = 'fieldId';
	protected readonly optionRelationColumnName: string = 'fieldOptionId';
	
	constructor(
		protected service: FieldFieldOptionService,
	) {
		super();
	}
}
