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
import { FormHttpController } from './form-http.controller';
import { FormFormOptionService } from '../form-form-option/form-form-option.service';
import { FormFormFormOptionService } from '../form-form-form-option/form-form-form-option.service';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from './form.entity';

@Module({
	controllers: [ FormHttpController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormOption,
			FormFormOption,
			Form,
			FormFormFormOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FormFormOptionService,
		FormFormFormOptionService,
		FormService,
	],
})
export class FormHttpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
