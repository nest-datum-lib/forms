import { Controller } from '@nestjs/common';
import { StatusHttpController } from '@nest-datum/status';
import { ContentStatusService } from './content-status.service';

@Controller(`${process.env.SERVICE_FORMS}/content-status`)
export class ContentStatusHttpController extends StatusHttpController {
	constructor(
		protected service: ContentStatusService,
	) {
		super();
	}
}
