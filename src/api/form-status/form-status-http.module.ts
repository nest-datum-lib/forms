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
import { FormStatusService } from './form-status.service';
import { FormStatusHttpController } from './form-status-http.controller';
import { FormStatus } from './form-status.entity';

@Module({
	controllers: [ FormStatusHttpController ],
	imports: [
		TypeOrmModule.forFeature([ FormStatus ]),
		CacheModule,
	],
	providers: [
		CacheService,
		FormStatusService, 
	],
})
export class FormStatusHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
