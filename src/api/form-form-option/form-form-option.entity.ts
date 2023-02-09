import { 
	Entity,
	Column, 
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { OptionOption as NestDatumOptionOption } from '@nest-datum/option';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';

@Entity()
export class FormFormOption extends NestDatumOptionOption {
	@Column()
	public formOptionId: string;

	@ManyToOne(() => FormOption, (formOption) => formOption.formFormOptions)
	public formOption: FormOption;

	@Column()
	public formId: string;

	@ManyToOne(() => Form, (form) => form.formFormOptions)
	public form: Form;

	@OneToMany(() => FormFormFormOption, (formFormFormOption) => formFormFormOption.formFormOption)
	public formFormFormOptions: FormFormFormOption[];
}
