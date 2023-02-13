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
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { FieldContent } from '../field-content/field-content.entity';
import { Form } from '../form/form.entity';
import { ContentStatus } from '../content-status/content-status.entity';
import { Content } from './content.entity';

@Module({
	controllers: [ ContentController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FieldContent,
			Form,
			ContentStatus,
			Content, 
		]),
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
		ContentService, 
	],
})
export class ContentModule {
}

