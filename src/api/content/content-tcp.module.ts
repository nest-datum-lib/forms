import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { ContentService } from './content.service';
import { ContentTcpController } from './content-tcp.controller';
import { FieldContent } from '../field-content/field-content.entity';
import { Content } from './content.entity';

@Module({
	controllers: [ ContentTcpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FieldContent,
			Content, 
		]),
		CacheModule,
	],
	providers: [
		CacheService,
		ContentService, 
	],
})
export class ContentTcpModule {
}

