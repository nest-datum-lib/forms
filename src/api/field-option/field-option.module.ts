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
import { FieldOptionService } from './field-option.service';
import { FieldOptionController } from './field-option.controller';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { Field } from '../field/field.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldOption } from './field-option.entity';

@Module({
	controllers: [ FieldOptionController ],
	imports: [
		TypeOrmModule.forFeature([
			FieldOption,
			FieldFieldOption,
			Field,
			FieldFieldFieldOption,
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
		FieldOptionService, 
	],
})
export class FieldOptionModule {
}

