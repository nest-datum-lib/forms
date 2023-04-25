import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { FieldFieldOptionService } from './field-field-option.service';
import { FieldFieldOptionTcpController } from './field-field-option-tcp.controller';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldOption } from '../field-option/field-option.entity';
import { Field } from '../field/field.entity';
import { FieldFieldOption } from './field-field-option.entity';

@Module({
	controllers: [
		FieldFieldOptionTcpController, 
	],
	imports: [
		TypeOrmModule.forFeature([
			FieldOption,
			FieldFieldOption,
			Field,
			FieldFieldFieldOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FieldFieldOptionService,
	],
})
export class FieldFieldOptionTcpModule {
}
