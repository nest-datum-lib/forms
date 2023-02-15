import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	redis,
	sql, 
} from '@nest-datum-common/config';
import { 
	ReplicaModule,
	ReplicaService, 
} from '@nest-datum/replica';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { SeedService } from './seed.service';
import { Setting } from '../api/setting/setting.entity';
import { FormStatus } from '../api/form-status/form-status.entity';
import { FieldStatus } from '../api/field-status/field-status.entity';
import { ContentStatus } from '../api/content-status/content-status.entity';
import { Form } from '../api/form/form.entity';
import { SettingSeeder } from './setting.seeder';
import { FormStatusSeeder } from './form-status.seeder';
import { FieldStatusSeeder } from './field-status.seeder';
import { ContentStatusSeeder } from './content-status.seeder';
import { FormSeeder } from './form.seeder';

@Module({
	controllers: [],
	imports: [
		RedisModule.forRoot(redis),
		TypeOrmModule.forRoot(sql),
		TypeOrmModule.forFeature([
			Setting,
			FormStatus,
			FieldStatus,
			ContentStatus,
			Form,
		]),
		ReplicaModule,
		TransportModule,
		CacheModule,
	],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SeedService,
		SettingSeeder,
		FormStatusSeeder,
		FieldStatusSeeder,
		ContentStatusSeeder,
		FormSeeder,
	]
})

export class SeedModule {
}
