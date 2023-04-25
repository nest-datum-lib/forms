import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { ContentStatusService } from './content-status.service';
import { ContentStatusHttpController } from './content-status-http.controller';
import { ContentStatus } from './content-status.entity';

@Module({
	controllers: [ ContentStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ ContentStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		ContentStatusService, 
	],
})
export class ContentStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
