import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { Field } from '../field/field.entity';

@Entity()
export class FieldFieldOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public fieldOptionId: string;

	@ManyToOne(() => FieldOption, (fieldOption) => fieldOption.fieldFieldOptions)
	public fieldOption: FieldOption;

	@Column()
	public fieldId: string;

	@ManyToOne(() => Field, (field) => field.fieldFieldOptions)
	public field: Field;

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

	@OneToMany(() => FieldFieldFieldOption, (fieldFieldFieldOption) => fieldFieldFieldOption.fieldFieldOption)
	public fieldFieldFieldOptions: FieldFieldFieldOption[];
}
