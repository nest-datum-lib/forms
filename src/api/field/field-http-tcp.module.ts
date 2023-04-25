import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { FieldHttpTcpController } from './field-http-tcp.controller';

@Module({
	controllers: [ FieldHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService, 
	],
})
export class FieldHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
