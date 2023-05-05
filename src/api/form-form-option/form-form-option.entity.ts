import { 
	Entity,
	Column, 
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Bind } from '@nest-datum/bind';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';

@Entity()
export class FormFormOption extends Bind {
	@Column()
	public formOptionId: string;

	@ManyToOne(() => FormOption, (formOption) => formOption.formFormOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public formOption: FormOption;

	@Column()
	public formId: string;

	@ManyToOne(() => Form, (form) => form.formFormOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public form: Form;

	@OneToMany(() => FormFormFormOption, (formFormFormOption) => formFormFormOption.formFormOption, {
		cascade: true,
	})
	public formFormFormOptions: FormFormFormOption[];
}
