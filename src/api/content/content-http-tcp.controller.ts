import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	UnauthorizedException,
	MethodNotAllowedException,
} from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { TransportService } from '@nest-datum/transport';
import { HttpTcpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';

@Controller(`${process.env.SERVICE_FORMS}/content`)
export class ContentHttpTcpController extends HttpTcpController {
	protected readonly serviceName: string = process.env.SERVICE_FORMS;
	protected readonly entityName: string = 'content';

	constructor(
		protected transport: TransportService,
	) {
		super();
	}

	async validateCreate(options) {
		if (!utilsCheckStrId(options['contentStatusId'])) {
			throw new MethodNotAllowedException(`Property "contentStatusId" is not valid.`);
		}
		if (!utilsCheckStrId(options['formId'])) {
			throw new MethodNotAllowedException(`Property "formId" is not valid.`);
		}
		if (utilsCheckExists(options['isPush'])) {
			if (!utilsCheckBool(options['isPush'])) {
				throw new MethodNotAllowedException(`Property "isPush" is not valid.`);
			}
			options['isPush'] = !!options['isPush'];
		}
		return {
			...await super.validateCreate(options),
			isPush: options['isPush'],
			contentStatusId: options['contentStatusId'],
			formId: options['formId'],
		};
	}

	async validateUpdate(options) {
		const output = {};

		if (utilsCheckExists(options['formId'])) {
			if (!utilsCheckStrId(options['formId'])) {
				throw new MethodNotAllowedException(`Property "formId" is not valid.`);
			}
			output['formId'] = options['formId'];
		}
		if (utilsCheckExists(options['contentStatusId'])) {
			if (!utilsCheckStrId(options['contentStatusId'])) {
				throw new MethodNotAllowedException(`Property "contentStatusId" is not valid.`);
			}
			output['contentStatusId'] = options['contentStatusId'];
		}
		return {
			...await super.validateUpdate(options),
			...output,
		};
	}

	@Post()
	async create(
		@AccessToken() accessToken: string,
		@Body('id') id: string,
		@Body('userId') userId: string,
		@Body('contentStatusId') contentStatusId: string,
		@Body('formId') formId: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isPush') isPush: boolean,
	) {
		return await this.serviceHandlerWrapper(
			async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.create`,
		}, await this.validateCreate({
			accessToken,
			id,
			userId,
			contentStatusId,
			formId,
			isNotDelete,
			isPush,
		})));
	}

	@Patch(':id')
	async update(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body('id') newId: string,
		@Body('userId') userId: string,
		@Body('contentStatusId') contentStatusId: string,
		@Body('formId') formId: string,
		@Body('isNotDelete') isNotDelete: boolean,
		@Body('isDeleted') isDeleted: boolean,
	) {
		return await this.serviceHandlerWrapper(
			async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.update`,
		}, await this.validateUpdate({
			accessToken,
			id,
			newId,
			userId,
			contentStatusId,
			formId,
			isNotDelete,
			isDeleted,
		})));
	}
}
