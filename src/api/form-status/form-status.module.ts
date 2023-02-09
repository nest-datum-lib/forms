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
import { FormStatusService } from './form-status.service';
import { FormStatusController } from './form-status.controller';
import { FormStatus } from './form-status.entity';

@Module({
	controllers: [ FormStatusController ],
	imports: [
		TypeOrmModule.forFeature([ FormStatus ]),
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
		FormStatusService, 
	],
})
export class FormStatusModule {
}

