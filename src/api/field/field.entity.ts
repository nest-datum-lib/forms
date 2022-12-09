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
import { FieldStatus } from '../field-status/field-status.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldContent } from '../field-content/field-content.entity';

@Entity()
export class Field {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public userId: string;

	@Column({ default: '' })
	public fieldStatusId: string;

	@ManyToOne(() => FieldStatus, (fieldStatus) => fieldStatus.fields)
	public fieldStatus: FieldStatus;

	@Column({ default: '' })
	public dataTypeId: string;

	@Column()
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

	@OneToMany(() => FieldFieldOption, (fieldFieldOption) => fieldFieldOption.field)
	public fieldFieldOptions: FieldFieldOption[];

	@OneToMany(() => FieldFieldFieldOption, (fieldFieldFieldOption) => fieldFieldFieldOption.field)
	public fieldFieldFieldOptions: FieldFieldFieldOption[];

	@OneToMany(() => FormField, (formField) => formField.field)
	public formFields: FormField[];

	@OneToMany(() => FieldContent, (fieldContent) => fieldContent.field)
	public fieldContents: FieldContent[];
}
