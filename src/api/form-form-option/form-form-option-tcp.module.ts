import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	CacheModule, 
	CacheService, 
} from '@nest-datum/cache';
import { FormFormOptionService } from './form-form-option.service';
import { FormFormOptionTcpController } from './form-form-option-tcp.controller';
import { FormFormFormOption } from '../form-form-form-option/form-form-form-option.entity';
import { FormOption } from '../form-option/form-option.entity';
import { Form } from '../form/form.entity';
import { FormFormOption } from './form-form-option.entity';

@Module({
	controllers: [
		FormFormOptionTcpController, 
	],
	imports: [
		TypeOrmModule.forFeature([
			FormOption,
			FormFormOption,
			Form,
			FormFormFormOption, 
		]),
		CacheModule,
	],
	providers: [ 
		CacheService,
		FormFormOptionService,
	],
})
export class FormFormOptionTcpModule {
}
