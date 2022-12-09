import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { FormField } from './form-field.entity';
import { Form } from '../form/form.entity';
import { Field } from '../field/field.entity';
import { FormFieldController } from './form-field.controller';
import { FormFieldService } from './form-field.service';

@Module({
	controllers: [ FormFieldController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormField,
			Form,
			Field, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FormFieldService, 
	],
})
export class FormFieldModule {
}

