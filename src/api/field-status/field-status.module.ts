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
import { FieldStatusService } from './field-status.service';
import { FieldStatusController } from './field-status.controller';
import { FieldStatus } from './field-status.entity';

@Module({
	controllers: [ FieldStatusController ],
	imports: [
		TypeOrmModule.forFeature([ FieldStatus ]),
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
		FieldStatusService, 
	],
})
export class FieldStatusModule {
}

