import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { ContentService } from './content.service';
import { ContentTcpController } from './content-tcp.controller';
import { Content } from './content.entity';

@Module({
	controllers: [ ContentTcpController ],
	imports: [
		TypeOrmModule.forFeature([ Content ]),
		CacheModule,
	],
	providers: [
		CacheService,
		ContentService, 
	],
})
export class ContentTcpModule {
}

