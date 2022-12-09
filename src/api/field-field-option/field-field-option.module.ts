import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldFieldOption } from './field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { Field } from '../field/field.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ 
			FieldFieldOption,
			FieldOption,
			Field, 
		]),
	],
})
export class FieldFieldOptionModule {
}

