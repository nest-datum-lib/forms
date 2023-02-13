import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { OptionOptionOption } from '@nest-datum/option';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from '../form/form.entity';

@Entity()
export class FormFormFormOption extends OptionOptionOption {
	@Column()
	public formFormOptionId: string;

	@ManyToOne(() => FormFormOption, (formFormOption) => formFormOption.formFormFormOptions, {
		onDelete: 'CASCADE'
	})
	public formFormOption: FormFormOption;

	@Column()
	public formId: string;

	@ManyToOne(() => Form, (form) => form.formFormFormOptions)
	public form: Form;
}
