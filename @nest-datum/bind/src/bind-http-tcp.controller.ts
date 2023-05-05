import { 
	Delete,
	Post,
	Patch,
	Body,
	Param,
} from '@nestjs/common';
import { 
	UnauthorizedException,
	MethodNotAllowedException
} from '@nestjs/common';
import { HttpTcpController } from '@nest-datum-common/controllers';
import { 
	checkToken,
	getUser, 
} from '@nest-datum-common/jwt';
import { strId as utilsCheckStrId } from '@nest-datum-utils/check';

export class BindHttpTcpController extends HttpTcpController {
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
			accessToken: options['accessToken'],
			userId: user['id'],
			[this.mainRelationColumnName ?? 'entityId']: options[this.mainRelationColumnName ?? 'entityId'],
			[this.optionRelationColumnName ?? 'entityOptionId']: options[this.optionRelationColumnName ?? 'entityOptionId'],
		};
	}

	@Post(':id')
	async create(
		@AccessToken() accessToken: string,
		@Param('id') entityOptionId: string,
		@Body() body,
	) {
		const bodyKeys = Object.keys(body);
		const entityId = body[bodyKeys[0]];

		return await this.serviceHandlerWrapper(async () => await this.transport.send({
			name: this.serviceName, 
			cmd: `${this.entityName}.create`,
		}, await this.validateCreate({
			accessToken,
			entityOptionId,
			entityId,
		})));
	}
}
