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
import { ContentService } from './content.service';
import { ContentHttpController } from './content-http.controller';
import { Content } from './content.entity';

@Module({
	controllers: [ ContentHttpController ],
	imports: [
		TypeOrmModule.forFeature([ Content ]),
		CacheModule,
	],
	providers: [
		CacheService,
		ContentService, 
	],
})
export class ContentHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
