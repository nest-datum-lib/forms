import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { FormStatusService } from './form-status.service';
import { FormStatusTcpController } from './form-status-tcp.controller';
import { FormStatus } from './form-status.entity';

@Module({
	controllers: [ FormStatusTcpController ],
	imports: [
		TypeOrmModule.forFeature([ FormStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		FormStatusService, 
	],
})
export class FormStatusTcpModule {
}

