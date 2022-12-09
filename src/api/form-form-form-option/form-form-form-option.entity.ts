import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from '../form/form.entity';

@Entity()
export class FormFormFormOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public parentId: string;

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

	@Column('text')
	public content: string;

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
}
