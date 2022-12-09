import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';

@Entity()
export class FormFormOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public formOptionId: string;

	@ManyToOne(() => FormOption, (formOption) => formOption.formFormOptions)
	public formOption: FormOption;

	@Column()
	public formId: string;

	@ManyToOne(() => Form, (form) => form.formFormOptions)
	public form: Form;

	@CreateDateColumn({ 
		type: 'timestamp', 
		precision: null,
		default: () => 'CURRENT_TIMESTAMP', 
	})
	public createdAt: Date;

	@UpdateDateColumn({ 
		type: 'timestamp', 
		precision: null,
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP', 
	})
	public updatedAt: Date;

	@OneToMany(() => FormFormFormOption, (formFormFormOption) => formFormFormOption.formFormOption)
	public formFormFormOptions: FormFormFormOption[];
}
