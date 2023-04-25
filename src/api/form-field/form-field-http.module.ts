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
import { FormField } from './form-field.entity';
import { FormFieldHttpController } from './form-field-http.controller';
import { FormFieldService } from './form-field.service';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';

@Module({
	controllers: [ FormFieldHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			Form,
			Field,  
		]),
		CacheModule,
	],
	providers: [
		CacheService,
		FormFieldService, 
	],
})
export class FormFieldHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
