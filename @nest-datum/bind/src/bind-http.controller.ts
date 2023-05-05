import { 
	UnauthorizedException,
	MethodNotAllowedException
} from '@nestjs/common';
import { HttpController } from '@nest-datum-common/controllers';
import { 
	checkToken,
	getUser, 
} from '@nest-datum-common/jwt';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';

export class BindHttpController extends HttpController {
	protected readonly mainRelationColumnName: string;
	protected readonly optionRelationColumnName: string;

	async validateCreate(options) {
		if (!checkToken(options['accessToken'], process.env.JWT_SECRET_ACCESS_KEY)) {
			throw new UnauthorizedException(`User is undefined or token is not valid.`);
		}
		const user = getUser(options['accessToken']);

		if (!utilsCheckStrId(options[this.mainRelationColumnName ?? 'entityId'])) {
			throw new MethodNotAllowedException(`Property "entityId" is not valid.`);
		}
		if (!utilsCheckStrId(options[this.optionRelationColumnName ?? 'entityOptionId'])) {
			throw new MethodNotAllowedException(`Property "entityOptionId" is not valid.`);
		}

		return {
			userId: user['id'],
			[this.mainRelationColumnName ?? 'entityId']: options[this.mainRelationColumnName ?? 'entityId'],
			[this.optionRelationColumnName ?? 'entityOptionId']: options[this.optionRelationColumnName ?? 'entityOptionId'],
		};
	}

	@Post(':id')
	async create(
		@AccessToken() accessToken: string,
		@Param('id') entityOptionId: string,
		@Body() data,
	) {
		const dataKeys = Object.keys(data);
		const entityId = data[dataKeys[0]];

		return await this.serviceHandlerWrapper(async () => await this.service.create(await this.validateCreate({
			accessToken,
			entityId,
			entityOptionId,
		})));
	}
}
