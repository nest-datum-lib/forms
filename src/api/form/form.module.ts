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
import { FormService } from './form.service';
import { FormController } from './form.controller';
import { FormField } from '../form-field/form-field.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FieldContent } from '../field-content/field-content.entity';
import { Field } from '../field/field.entity';
import { Form } from './form.entity';

@Module({
	controllers: [ FormController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Field,
			FormField,
			FormFormFormOption,
			FormFormOption,
			FieldContent, 
			Form,
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
		FormService, 
	],
})
export class FormModule {
}

