import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Field } from '../field/field.entity';
import { FieldStatus } from './field-status.entity';
import { FieldStatusService } from './field-status.service';
import { FieldStatusController } from './field-status.controller';

@Module({
	controllers: [ FieldStatusController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Field,
			FieldStatus, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FieldStatusService, 
	],
})
export class FieldStatusModule {
}
