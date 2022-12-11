import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { FormFormOptionController } from './form-form-option.controller';
import { FormFormOptionService } from './form-form-option.service';
import { FormFormOption } from './form-form-option.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';

@Module({
	controllers: [ FormFormOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormFormOption,
			FormFormFormOption,
			FormOption,
			Form, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FormFormOptionService, 
	],
})
export class FormFormOptionModule {
}
