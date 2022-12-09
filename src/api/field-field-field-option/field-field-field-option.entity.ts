import { 
	Entity, 
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from '../field/field.entity';

@Entity()
export class FieldFieldFieldOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public parentId: string;

	@Column()
	public fieldFieldOptionId: string;

	@ManyToOne(() => FieldFieldOption, (fieldFieldOption) => fieldFieldOption.fieldFieldFieldOptions, {
		onDelete: 'CASCADE'
	})
	public fieldFieldOption: FieldFieldOption;

	@Column()
	public fieldId: string;

	@ManyToOne(() => Field, (field) => field.fieldFieldFieldOptions)
	public field: Field;

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
