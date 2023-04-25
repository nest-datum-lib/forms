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
import { FormService } from './form.service';
import { FormTcpController } from './form-tcp.controller';
import { FormField } from '../form-field/form-field.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FieldContent } from '../field-content/field-content.entity';
import { Field } from '../field/field.entity';
import { Form } from './form.entity';

@Module({
	controllers: [ FormTcpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Field,
			FormField,
			FormFormFormOption,
			FormFormOption,
			FieldContent, 
			Form,
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FormService,
	],
})
export class FormTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
