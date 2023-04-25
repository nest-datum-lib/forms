import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { FormField } from './form-field.entity';
import { FormFieldTcpController } from './form-field-tcp.controller';
import { FormFieldService } from './form-field.service';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';

@Module({
	controllers: [
		FormFieldTcpController, 
	],
	imports: [
		TypeOrmModule.forFeature([
			FormField,
			Form,
			Field, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FormFieldService,
	],
})
export class FormFieldTcpModule {
}
