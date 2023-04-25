import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { FormOptionService } from './form-option.service';
import { FormOptionTcpController } from './form-option-tcp.controller';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from '../form/form.entity';
import { FormOption } from './form-option.entity';

@Module({
	controllers: [
		FormOptionTcpController, 
	],
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
		FormOptionService,
	],
})
export class FormOptionTcpModule {
}
