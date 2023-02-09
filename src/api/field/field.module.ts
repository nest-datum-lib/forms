import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { 
	SqlModule,
	SqlService, 
} from '@nest-datum/sql';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { Form } from '../form/form.entity';
import { FormField } from '../form-field/form-field.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldContent } from '../field-content/field-content.entity';
import { Field } from './field.entity';

@Module({
	controllers: [ FieldController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Form,
			FormField,
			FieldFieldFieldOption,
			FieldFieldOption,
			FieldContent, 
			Field,
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
		FieldService, 
	],
})
export class FieldModule {
}

