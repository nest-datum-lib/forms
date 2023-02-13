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
import { FieldContentService } from './field-content.service';
import { FieldContentController } from './field-content.controller';
import { FormField } from '../form-field/form-field.entity';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';
import { Content } from '../content/content.entity';
import { ContentStatus } from '../content-status/content-status.entity';
import { FieldContent } from './field-content.entity';

@Module({
	controllers: [ FieldContentController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			Form,
			Field,
			FieldContent,
			ContentStatus,
			Content,  
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
		FieldContentService, 
	],
})
export class FieldContentModule {
}

