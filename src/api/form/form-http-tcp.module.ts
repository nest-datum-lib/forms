import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { FormHttpTcpController } from './form-http-tcp.controller';

@Module({
	controllers: [ FormHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService, 
	],
})
export class FormHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
