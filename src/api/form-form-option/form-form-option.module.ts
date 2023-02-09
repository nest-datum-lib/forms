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
import { FormFormOptionService } from './form-form-option.service';
import { FormFormOptionController } from './form-form-option.controller';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';
import { FormFormOption } from './form-form-option.entity';

@Module({
	controllers: [ FormFormOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormOption,
			FormFormOption,
			Form,
			FormFormFormOption, 
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
		FormFormOptionService, 
	],
})
export class FormFormOptionModule {
}

