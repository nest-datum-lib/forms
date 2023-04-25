import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { FormFieldHttpTcpController } from './form-field-http-tcp.controller';

@Module({
	imports: [ 
		TransportModule, 
	],
	controllers: [ FormFieldHttpTcpController ],
	providers: [ 
		TransportService, 
	],
})
export class FormFieldHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
