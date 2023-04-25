import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
	CacheModule,
	CacheService, 
} from '@nest-datum/cache';
import { FieldOptionService } from './field-option.service';
import { FieldOptionTcpController } from './field-option-tcp.controller';
import { FieldFieldFieldOption } from '../field-field-field-option/field-field-field-option.entity';
import { FieldFieldOption } from '../field-field-option/field-field-option.entity';
import { Field } from '../field/field.entity';
import { FieldOption } from './field-option.entity';

@Module({
	controllers: [
		FieldOptionTcpController, 
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
		FieldOptionService,
	],
})
export class FieldOptionTcpModule {
}
