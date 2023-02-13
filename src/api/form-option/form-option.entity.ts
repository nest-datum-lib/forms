import { 
	Entity,
	OneToMany, 
} from 'typeorm';
import { Option } from '@nest-datum/option';
import { FormFormOption } from '../form-form-option/form-form-option.entity';

@Entity()
export class FormOption extends Option {
	@OneToMany(() => FormFormOption, (formFormOption) => formFormOption.formOption)
	public formFormOptions: FormFormOption[];
}
