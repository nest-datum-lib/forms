import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
	Index,
} from 'typeorm';
import { FormField } from '../form-field/form-field.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldContent } from '../field-content/field-content.entity';

@Entity()
export class Field {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	@Index()
	public userId: string;

	@Column({ default: '' })
	@Index()
	public fieldStatusId: string;

	@Column({ default: '' })
	@Index()
	public dataTypeId: string;

	@Column()
	@Index()
	public name: string;

	@Column({ default: '' })
	public description: string;

	@Column('boolean', { default: false })
	public isRequired: boolean = false;

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

	@OneToMany(() => FieldFieldOption, (fieldFieldOption) => fieldFieldOption.field, {
		cascade: true,
	})
	public fieldFieldOptions: FieldFieldOption[];

	@OneToMany(() => FieldFieldFieldOption, (fieldFieldFieldOption) => fieldFieldFieldOption.field, {
		cascade: true,
	})
	public fieldFieldFieldOptions: FieldFieldFieldOption[];

	@OneToMany(() => FormField, (formField) => formField.field, {
		cascade: true,
	})
	public formFields: FormField[];

	@OneToMany(() => FieldContent, (fieldContent) => fieldContent.field, {
		cascade: true,
	})
	public fieldContents: FieldContent[];
}
