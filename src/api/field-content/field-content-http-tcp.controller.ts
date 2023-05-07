import { 
	Post,
	Patch,
	Body,
	Param,
} from '@nestjs/common';
import { MethodNotAllowedException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { BindHttpTcpController } from '@nest-datum/bind';
import { TransportService } from '@nest-datum/transport';
import { exists as utilsCheckExists } from '@nest-datum-utils/check';

@Controller(`${process.env.SERVICE_FORMS}/field/content`)
export class FieldContentHttpTcpController extends BindHttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'fieldContent';
	protected readonly mainRelationColumnName: string = 'contentId';
	protected readonly optionRelationColumnName: string = 'fieldId';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckExists(options['value'])) {
			throw new MethodNotAllowedException(`Property "value" is not valid.`);
		}
		return {
			value: options['value'],
			...await super.validateCreate(options),
		};
	}

	@Post(':id')
	async create(
		@AccessToken() accessToken: string,
		@Param('id') entityId: string,
		@Body() body,
	) {
		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.create`,
		}, await this.validateCreate({
			accessToken,
			value: body['value'],
			[this.mainRelationColumnName]: entityId,
			[this.optionRelationColumnName]: body['fieldId'],
		})));
	}
}
