import { RedisModule } from '@liaoliaots/nestjs-redis';
import { ClientsModule } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from 'config/typeorm';
import { redisConfig } from 'config/redis';
import { BalancerModule } from 'nest-datum/balancer/src';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SettingModule } from './api/setting/setting.module';
import { FormStatusModule } from './api/form-status/form-status.module';
import { FormOptionModule } from './api/form-option/form-option.module';
import { FormFormOptionModule } from './api/form-form-option/form-form-option.module';
import { FormFormFormOptionModule } from './api/form-form-form-option/form-form-form-option.module';
import { FormModule } from './api/form/form.module';
import { FieldStatusModule } from './api/field-status/field-status.module';
import { FieldOptionModule } from './api/field-option/field-option.module';
import { FieldFieldOptionModule } from './api/field-field-option/field-field-option.module';
import { FieldFieldFieldOptionModule } from './api/field-field-field-option/field-field-field-option.module';
import { FieldModule } from './api/field/field.module';
import { FormFieldModule } from './api/form-field/form-field.module';
import { ContentModule } from './api/content/content.module';
import { ContentStatusModule } from './api/content-status/content-status.module';
import { FieldContentModule } from './api/field-content/field-content.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(typeormConfig),
		RedisModule.forRoot(redisConfig),
		BalancerModule,
		SettingModule,
		FormStatusModule,
		FormOptionModule,
		FormFormOptionModule,
		FormFormFormOptionModule,
		FormModule,
		FieldStatusModule,
		FieldOptionModule,
		FieldFieldOptionModule,
		FieldFieldFieldOptionModule,
		FieldModule,
		FormFieldModule,
		ContentModule,
		ContentStatusModule,
		FieldContentModule,
	],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule {
}
