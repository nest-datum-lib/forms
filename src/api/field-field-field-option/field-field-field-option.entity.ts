import { 
	Entity,
	Column, 
	ManyToOne,
} from 'typeorm';
import { OptionOptionOption as NestDatumOptionOptionOption } from '@nest-datum/option';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from '../field/field.entity';

@Entity()
export class FieldFieldFieldOption extends NestDatumOptionOptionOption {
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
}
