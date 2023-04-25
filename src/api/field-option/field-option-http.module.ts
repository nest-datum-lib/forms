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
import { FieldOptionService } from './field-option.service';
import { FieldOptionHttpController } from './field-option-http.controller';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from '../field/field.entity';
import { FieldOption } from './field-option.entity';

@Module({
	controllers: [ FieldOptionHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FieldOption,
			FieldFieldOption,
			Field,
			FieldFieldFieldOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FieldOptionService,
	],
})
export class FieldOptionHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
