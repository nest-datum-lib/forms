import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	BalancerRepository,
	BalancerService, 
} from 'nest-datum/balancer/src';
import { CacheService } from 'nest-datum/cache/src';
import { Content } from '../content/content.entity';
import { ContentStatus } from './content-status.entity';
import { ContentStatusService } from './content-status.service';
import { ContentStatusController } from './content-status.controller';

@Module({
	controllers: [ ContentStatusController ],
	imports: [
		TypeOrmModule.forFeature([ 
			Content,
			ContentStatus, 
		]),
	],
	providers: [
		BalancerRepository, 
		BalancerService,
		CacheService,
		ContentStatusService, 
	],
})
export class ContentStatusModule {
}
