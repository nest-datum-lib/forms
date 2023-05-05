import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { Many } from '@nest-datum/many';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from '../field/field.entity';

@Entity()
export class FieldFieldFieldOption extends Many {
	@Column()
	public fieldFieldOptionId: string;

	@ManyToOne(() => FieldFieldOption, (fieldFieldOption) => fieldFieldOption.fieldFieldFieldOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public fieldFieldOption: FieldFieldOption;

	@Column()
	public fieldId: string;

	@ManyToOne(() => Field, (field) => field.fieldFieldFieldOptions, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public field: Field;
}
