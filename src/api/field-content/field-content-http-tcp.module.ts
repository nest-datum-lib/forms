import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { FieldContentHttpTcpController } from './field-content-http-tcp.controller';

@Module({
	imports: [ 
		TransportModule, 
	],
	controllers: [ FieldContentHttpTcpController ],
	providers: [ 
		TransportService, 
	],
})
export class FieldContentHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
