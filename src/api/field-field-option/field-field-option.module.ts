import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { FieldFieldOptionController } from './field-field-option.controller';
import { FieldFieldOptionService } from './field-field-option.service';
import { FieldFieldOption } from './field-field-option.entity';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { Field } from '../field/field.entity';

@Module({
	controllers: [ FieldFieldOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FieldFieldOption,
			FieldFieldFieldOption,
			FieldOption,
			Field, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FieldFieldOptionService, 
	],
})
export class FieldFieldOptionModule {
}
