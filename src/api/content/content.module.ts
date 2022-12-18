import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { FieldContent } from '../field-content/field-content.entity';
import { Form } from '../form/form.entity';
import { ContentStatus } from '../content-status/content-status.entity';
import { Content } from './content.entity';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';

@Module({
	controllers: [ ContentController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FieldContent,
			Form,
			ContentStatus,
			Content, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		ContentService, 
	],
})
export class ContentModule {
}

