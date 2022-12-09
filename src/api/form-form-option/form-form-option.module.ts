import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			FormFormFormOption,
			FormOption, 
			Form,
		]),
	],
})
export class FormFormOptionModule {
}

