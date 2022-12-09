import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormField } from './form-field.entity';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ FormField ]),
		TypeOrmModule.forFeature([ Form ]),
		TypeOrmModule.forFeature([ Field ]),
	],
})
export class FormFieldModule {
}

