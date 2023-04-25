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
import { FieldContentHttpController } from './field-content-http.controller';
import { FieldContentService } from './field-content.service';
import { FormField } from '../form-field/form-field.entity';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';
import { Content } from '../content/content.entity';
import { ContentStatus } from '../content-status/content-status.entity';
import { FieldContent } from './field-content.entity';

@Module({
	controllers: [ FieldContentHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			Form,
			Field,
			FieldContent,
			ContentStatus,
			Content,  
		]),
		CacheModule,
	],
	providers: [
		CacheService,
		FieldContentService, 
	],
})
export class FieldContentHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
