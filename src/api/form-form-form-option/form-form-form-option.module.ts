import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from '../form/form.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			FormFormOption,
			Form, 
		]),
	],
})
export class FormFormFormOptionModule {
}

