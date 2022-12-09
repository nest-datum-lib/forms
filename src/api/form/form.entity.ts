import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { FormField } from '../form-field/form-field.entity';
import { FormStatus } from '../form-status/form-status.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Content } from '../content/content.entity';

@Entity()
export class Form {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public userId: string;

	@Column({ default: '' })
	public formStatusId: string;

	@ManyToOne(() => FormStatus, (formStatus) => formStatus.forms)
	public formStatus: FormStatus;

	@Column()
	public name: string;

	@Column({ default: '' })
	public description: string;

	@Column('boolean', { default: false })
	public isDeleted: boolean = false;

	@Column('boolean', { default: false })
	public isNotDelete: boolean;

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

	@OneToMany(() => FormFormOption, (formFormOption) => formFormOption.form)
	public formFormOptions: FormFormOption[];

	@OneToMany(() => FormFormFormOption, (formFormFormOption) => formFormFormOption.form)
	public formFormFormOptions: FormFormFormOption[];

	@OneToMany(() => FormField, (formField) => formField.form)
	public formFields: FormField[];

	@OneToMany(() => Content, (content) => content.form)
	public contents: Content[];
}
