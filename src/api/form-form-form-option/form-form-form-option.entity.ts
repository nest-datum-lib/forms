import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { Many } from '@nest-datum/many';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from '../form/form.entity';

@Entity()
export class FormFormFormOption extends Many {
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
