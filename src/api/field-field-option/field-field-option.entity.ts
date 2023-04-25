import { 
	Entity,
	Column, 
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Bind } from '@nest-datum/bind';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { Field } from '../field/field.entity';

@Entity()
export class FieldFieldOption extends Bind {
	@Column()
	public fieldOptionId: string;

	@ManyToOne(() => FieldOption, (fieldOption) => fieldOption.fieldFieldOptions)
	public fieldOption: FieldOption;

	@Column()
	public fieldId: string;

	@ManyToOne(() => Field, (field) => field.fieldFieldOptions)
	public field: Field;

	@OneToMany(() => FieldFieldFieldOption, (fieldFieldFieldOption) => fieldFieldFieldOption.fieldFieldOption)
	public fieldFieldFieldOptions: FieldFieldFieldOption[];
}
