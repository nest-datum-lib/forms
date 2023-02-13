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
import { ReportStatusService } from './report-status.service';
import { ReportStatusController } from './report-status.controller';
import { ReportStatus } from './report-status.entity';

@Module({
	controllers: [ ReportStatusController ],
	imports: [
		TypeOrmModule.forFeature([ ReportStatus ]),
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
		ReportStatusService, 
	],
})
export class ReportStatusModule {
}

