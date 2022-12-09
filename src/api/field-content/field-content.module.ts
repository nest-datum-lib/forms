import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';
import { Content } from '../content/content.entity';
import { ContentStatus } from '../content-status/content-status.entity';
import { FieldContent } from './field-content.entity';
import { FieldContentService } from './field-content.service';
import { FieldContentController } from './field-content.controller';

@Module({
	controllers: [ FieldContentController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Form,
			Field,
			FieldContent,
			ContentStatus,
			Content, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FieldContentService, 
	],
})
export class FieldContentModule {
}

