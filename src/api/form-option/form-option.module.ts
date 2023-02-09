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
import { FormOptionService } from './form-option.service';
import { FormOptionController } from './form-option.controller';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { Form } from '../form/form.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FormOption } from './form-option.entity';

@Module({
	controllers: [ FormOptionController ],
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
		FormOptionService, 
	],
})
export class FormOptionModule {
}

