import { 
	Get, 
	Delete,
	Post,
	Patch,
	Body,
	Param,
	Query,
	HttpException,
} from '@nestjs/common';
import { AccessToken } from '@nest-datum-common/decorators';
import { HttpController } from './http-controller';

export class HttpOptionController extends HttpController {
	public transportService;
	public service;
	public optionContentService;

	@Get('option')
	async optionMany(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Query('page') page: number,
		@Query('limit') limit: number,
		@Query('query') query: string,
		@Query('filter') filter: string,
		@Query('sort') sort: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => {
			const many = await this.optionContentService.many(await this.validateMany({
				accessToken,
				select,
				relations,
				page,
				limit,
				query,
				filter,
				sort,
			}));

			return {
				rows: many[0],
				total: many[1],
			};
		});
	}

	@Get('option/:id')
	async optionOne(
		@AccessToken() accessToken: string,
		@Query('select') select: string,
		@Query('relations') relations: string,
		@Param('id') id: string,
	): Promise<any> {
		return await this.serviceHandlerWrapper(async () => await this.optionContentService.one(await this.validateOne({
			accessToken,
			select,
			relations,
			id,
		})));
	}

	@Delete('option/:id')
	async optionDrop(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
	) {
		return await this.serviceHandlerWrapper(async () => await this.optionContentService.drop(await this.validateDrop({
			accessToken,
			id,
		})));
	}

	@Post(':id/options')
	async createOptions(
		@AccessToken() accessToken: string,
		@Param('id') id: string,
		@Body() data,
	) {
		return await this.serviceHandlerWrapper(async () => await this.service.createOptions(await this.validateOptions({
			accessToken,
			id,
			data,
		})));
	}
}
