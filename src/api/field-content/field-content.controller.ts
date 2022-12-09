import getCurrentLine from 'get-current-line';
import { Controller } from '@nestjs/common';
import { 
	MessagePattern,
	EventPattern, 
} from '@nestjs/microservices';
import { BalancerService } from 'nest-datum/balancer/src';
import * as Validators from 'nest-datum/validators/src';
import { FieldContentService } from './field-content.service';

@Controller()
export class FieldContentController {
	constructor(
		private readonly fieldContentService: FieldContentService,
		private readonly balancerService: BalancerService,
	) {
	}

	@MessagePattern({ cmd: 'fieldContent.many' })
	async many(payload) {
		try {
			const many = await this.fieldContentService.many({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FORMS_FIELD_CONTENT_MANY'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				sort: Validators.obj('sort', payload['sort']),
				filter: Validators.obj('filter', payload['filter']),
				query: Validators.str('query', payload['query'], {
					min: 1,
					max: 255,
				}),
				page: Validators.int('page', payload['page'], {
					min: 1,
					default: 1,
				}),
				limit: Validators.int('limit', payload['limit'], {
					min: 1,
					default: 20,
				}),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return {
				total: many[1],
				rows: many[0],
			};
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@MessagePattern({ cmd: 'fieldContent.one' })
	async one(payload) {
		try {
			const output = await this.fieldContentService.one({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FORMS_FIELD_CONTENT_ONE'] ],
					isRequired: true,
				}),
				relations: Validators.obj('relations', payload['relations']),
				select: Validators.obj('select', payload['select']),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('fieldContent.drop')
	async drop(payload) {
		try {
			await this.fieldContentService.drop({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FORMS_FIELD_CONTENT_DROP'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id'], {
					isRequired: true,
				}),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('fieldContent.dropMany')
	async dropMany(payload) {
		try {
			await this.fieldContentService.dropMany({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FORMS_FIELD_CONTENT_DROP_MANY'] ],
					isRequired: true,
				}),
				ids: Validators.arr('ids', payload['ids'], {
					isRequired: true,
					min: 1,
				}),
			});
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('fieldContent.create')
	async create(payload) {
		try {
			const output = await this.fieldContentService.create({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FORMS_FIELD_CONTENT_CREATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id']),
				userId: Validators.id('userId', payload['userId']),
				fieldId: Validators.id('fieldId', payload['fieldId'], {
					isRequired: true,
				}),
				contentId: Validators.id('contentId', payload['contentId'], {
					isRequired: true,
				}),
				value: Validators.str('value', payload['value']),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return output;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}

	@EventPattern('fieldContent.update')
	async update(payload) {
		try {
			await this.fieldContentService.update({
				user: Validators.token('accessToken', payload['accessToken'], {
					accesses: [ process['ACCESS_FORMS_FIELD_CONTENT_UPDATE'] ],
					isRequired: true,
				}),
				id: Validators.id('id', payload['id']),
				newId: Validators.id('newId', payload['newId']),
				fieldId: Validators.id('fieldId', payload['fieldId']),
				contentId: Validators.id('contentId', payload['contentId']),
				value: Validators.str('value', payload['value']),
				isDeleted: Validators.bool('isDeleted', payload['isDeleted']),
				createdAt: Validators.date('createdAt', payload['createdAt']),
			});

			this.balancerService.decrementServiceResponseLoadingIndicator();

			return true;
		}
		catch (err) {
			this.balancerService.log(err);
			this.balancerService.decrementServiceResponseLoadingIndicator();

			return err;
		}
	}
}
