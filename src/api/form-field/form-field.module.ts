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
import { FormField } from './form-field.entity';
import { FormFieldController } from './form-field.controller';
import { FormFieldService } from './form-field.service';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';

@Module({
	controllers: [ FormFieldController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			Form,
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
		FormFieldService, 
	],
})
export class FormFieldModule {
}

