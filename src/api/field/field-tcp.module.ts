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
import { FieldTcpController } from './field-tcp.controller';
import { FormField } from '../form-field/form-field.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldContent } from '../field-content/field-content.entity';
import { Field } from './field.entity';

@Module({
	controllers: [ FieldTcpController ],
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
		FieldService,
	],
})
export class FieldTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
