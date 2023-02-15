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
import { FormField } from '../api/form-field/form-field.entity';
import { FormFormFormOption } from '../api/form-form-form-option/form-form-form-option.entity';
import { FormFormOption } from '../api/form-form-option/form-form-option.entity';
import { FieldContent } from '../api/field-content/field-content.entity';
import { Field } from '../api/field/field.entity';
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
			Field,
			FormFormOption,
			Form,
			FormField,
			FormFormFormOption,
			FieldContent,
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
