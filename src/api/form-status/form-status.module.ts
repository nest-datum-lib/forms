import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Form } from '../form/form.entity';
import { FormStatus } from './form-status.entity';
import { FormStatusService } from './form-status.service';
import { FormStatusController } from './form-status.controller';

@Module({
	controllers: [ FormStatusController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Form,
			FormStatus, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FormStatusService, 
	],
})
export class FormStatusModule {
}
