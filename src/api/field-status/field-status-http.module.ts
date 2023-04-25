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
import { FieldStatusService } from './field-status.service';
import { FieldStatusHttpController } from './field-status-http.controller';
import { FieldStatus } from './field-status.entity';

@Module({
	controllers: [ FieldStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ FieldStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		FieldStatusService, 
	],
})
export class FieldStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
