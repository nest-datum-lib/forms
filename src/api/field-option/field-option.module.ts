import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { FieldOption } from './field-option.entity';
import { FieldOptionService } from './field-option.service';
import { FieldOptionController } from './field-option.controller';

@Module({
	controllers: [ FieldOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FieldOption,
			FieldFieldOption, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FieldOptionService, 
	],
})
export class FieldOptionModule {
}


