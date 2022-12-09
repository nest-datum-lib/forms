import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldFieldFieldOption } from './field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from '../field/field.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			FieldFieldFieldOption,
			FieldFieldOption,
			Field, 
		]),
	],
})
export class FieldFieldFieldOptionModule {
}

