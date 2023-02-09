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
import { ContentStatusService } from './content-status.service';
import { ContentStatusController } from './content-status.controller';
import { ContentStatus } from './content-status.entity';

@Module({
	controllers: [ ContentStatusController ],
	imports: [
		TypeOrmModule.forFeature([ ContentStatus ]),
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
		ContentStatusService, 
	],
})
export class ContentStatusModule {
}

