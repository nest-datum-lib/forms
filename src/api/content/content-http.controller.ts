import { 
	Controller,
	Post,
	Patch,
	Body,
	Param,
	MethodNotAllowedException,
} from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController } from '@nest-datum-common/controllers';
import { 
	exists as utilsCheckExists,
	strId as utilsCheckStrId,
	bool as utilsCheckBool,
} from '@nest-datum-utils/check';
import { ContentService } from './content.service';

@Controller(`${process.env.SERVICE_FORMS}/content`)
export class ContentHttpController extends HttpController {
	constructor(
		protected readonly service: ContentService,
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
		return await super.validateCreate({
			isPush: options['isPush'],
			contentStatusId: options['contentStatusId'],
			formId: options['formId'],
		});
	}

	async validateUpdate(options) {
		const output = {};

		if (utilsCheckExists(options['userId'])) {
			if (!utilsCheckStrId(options['userId'])) {
				throw new MethodNotAllowedException(`Property "userId" is not valid.`);
			}
			output['userId'] = options['userId'];
		}
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
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			id,
			userId,
			contentStatusId,
			formId,
			isNotDelete,
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
		return await this.serviceHandlerWrapper(async () => await this.service.update(await this.validateUpdate({
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
