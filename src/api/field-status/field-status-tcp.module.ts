import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { FieldStatusService } from './field-status.service';
import { FieldStatusTcpController } from './field-status-tcp.controller';
import { FieldStatus } from './field-status.entity';

@Module({
	controllers: [ FieldStatusTcpController ],
	imports: [
		TypeOrmModule.forFeature([ FieldStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		FieldStatusService, 
	],
})
export class FieldStatusTcpModule {
}

