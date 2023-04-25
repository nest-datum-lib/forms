import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { ContentStatusService } from './content-status.service';
import { ContentStatusTcpController } from './content-status-tcp.controller';
import { ContentStatus } from './content-status.entity';

@Module({
	controllers: [ ContentStatusTcpController ],
	imports: [
		TypeOrmModule.forFeature([ ContentStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		ContentStatusService, 
	],
})
export class ContentStatusTcpModule {
}

