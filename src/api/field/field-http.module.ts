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
import { FieldService } from './field.service';
import { FormField } from '../form-field/form-field.entity';
import { FieldHttpController } from './field-http.controller';
import { FieldFieldOptionService } from '../field-field-option/field-field-option.service';
import { FieldFieldFieldOptionService } from '../field-field-field-option/field-field-field-option.service';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldContent } from '../field-content/field-content.entity';
import { Field } from './field.entity';

@Module({
	controllers: [ FieldHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			FieldOption,
			FieldFieldOption,
			Field,
			FieldFieldFieldOption, 
			FieldContent, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FieldFieldOptionService,
		FieldFieldFieldOptionService,
		FieldService,
	],
})
export class FieldHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
