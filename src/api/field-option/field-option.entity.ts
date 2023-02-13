import { 
	Entity,
	OneToMany, 
} from 'typeorm';
import { Option } from '@nest-datum/option';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';

@Entity()
export class FieldOption extends Option {
	@OneToMany(() => FieldFieldOption, (fieldFieldOption) => fieldFieldOption.fieldOption)
	public fieldFieldOptions: FieldFieldOption[];
}
