import { RedisModule } from '@liaoliaots/nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
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
import { 
	SqlModule,
	SqlService, 
} from '@nest-datum/sql';
import { 
	redis,
	sql, 
} from '@nest-datum-common/config';
import { SettingModule } from './api/setting/setting.module';
import { FormStatusModule } from './api/form-status/form-status.module';
import { FormOptionModule } from './api/form-option/form-option.module';
import { FormFormOptionModule } from './api/form-form-option/form-form-option.module';
import { FormModule } from './api/form/form.module';
import { FieldStatusModule } from './api/field-status/field-status.module';
import { FieldOptionModule } from './api/field-option/field-option.module';
import { FieldFieldOptionModule } from './api/field-field-option/field-field-option.module';
import { FieldModule } from './api/field/field.module';
import { FormFieldModule } from './api/form-field/form-field.module';
import { ContentModule } from './api/content/content.module';
import { ContentStatusModule } from './api/content-status/content-status.module';
import { FieldContentModule } from './api/field-content/field-content.module';
import { AppController } from './app.controller';

@Module({
	imports: [
		TypeOrmModule.forRoot(sql),
		RedisModule.forRoot(redis),
		ReplicaModule,
		TransportModule,
		CacheModule,
		SqlModule,
		SettingModule,
		FormStatusModule,
		FormOptionModule,
		FormFormOptionModule,
		FormModule,
		FieldStatusModule,
		FieldOptionModule,
		FieldFieldOptionModule,
		FieldModule,
		FormFieldModule,
		ContentModule,
		ContentStatusModule,
		FieldContentModule,
	],
	controllers: [ AppController ],
	providers: [
		ReplicaService,
		TransportService,
		CacheService,
		SqlService,
	],
})
export class AppModule {
}
