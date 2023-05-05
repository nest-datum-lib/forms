import { Controller } from '@nestjs/common';
import { BindHttpController } from '@nest-datum/bind';
import { FormFieldService } from './form-field.service';

@Controller(`${process.env.SERVICE_FORMS}/form/field`)
export class FormFieldHttpController extends BindHttpController {
	protected readonly mainRelationColumnName: string = 'formId';
	protected readonly optionRelationColumnName: string = 'fieldId';

	constructor(
		protected service: FormFieldService,
	) {
		super();
	}
}
