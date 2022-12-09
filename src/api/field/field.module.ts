import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Content } from '../content/content.entity';
import { Form } from '../form/form.entity';
import { FormField } from '../form-field/form-field.entity';
import { FieldStatus } from '../field-status/field-status.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from './field.entity';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';

@Module({
	controllers: [ FieldController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Form,
			FormField,
			FieldStatus,
			FieldFieldFieldOption,
			FieldFieldOption,
			Field, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FieldService, 
	],
})
export class FieldModule {
}

