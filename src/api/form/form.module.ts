import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Content } from '../content/content.entity';
import { Field } from '../field/field.entity';
import { FormField } from '../form-field/form-field.entity';
import { FormStatus } from '../form-status/form-status.entity';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { Form } from './form.entity';
import { FormService } from './form.service';
import { FormController } from './form.controller';

@Module({
	controllers: [ FormController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			FormStatus,
			FormFormFormOption,
			FormFormOption,
			Form,
			Field, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FormService, 
	],
})
export class FormModule {
}

