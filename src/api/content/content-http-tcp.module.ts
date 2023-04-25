import { 
	Module,
	NestModule,
	MiddlewareConsumer, 
} from '@nestjs/common';
import { 
	TransportModule,
	TransportService, 
} from '@nest-datum/transport';
import { ContentHttpTcpController } from './content-http-tcp.controller';

@Module({
	controllers: [ ContentHttpTcpController ],
	imports: [
		TransportModule,
	],
	providers: [ 
		TransportService, 
	],
})
export class ContentHttpTcpModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	}
}
