import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { FormFormOption } from '../form-form-option/form-form-option.entity';
import { FormOption } from './form-option.entity';
import { FormOptionService } from './form-option.service';
import { FormOptionController } from './form-option.controller';

@Module({
	controllers: [ FormOptionController ],
	imports: [
		TypeOrmModule.forFeature([ 
			FormOption,
			FormFormOption, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		FormOptionService, 
	],
})
export class FormOptionModule {
}


