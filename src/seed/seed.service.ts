import { Promise as Bluebird } from 'bluebird';
import { Connection } from 'typeorm';
import {
	Injectable,
	Logger,
} from '@nestjs/common';
import { CacheService } from '@nest-datum/cache';
import { SettingSeeder } from './setting.seeder';
import { FormStatusSeeder } from './form-status.seeder';
import { FieldStatusSeeder } from './field-status.seeder';
import { ContentStatusSeeder } from './content-status.seeder';
import { FormSeeder } from './form.seeder';

@Injectable()
export class SeedService {
	private readonly seeders = [];
	private readonly logger = new Logger(SeedService.name);

	constructor(
		private readonly cacheService: CacheService,
		private readonly connection: Connection,
		private readonly settings: SettingSeeder,
		private readonly formStatus: FormStatusSeeder,
		private readonly fieldStatus: FieldStatusSeeder,
		private readonly contentStatus: ContentStatusSeeder,
		private readonly form: FormSeeder,
	) {
		this.seeders = [
			this.settings,
			this.formStatus,
			this.fieldStatus,
			this.contentStatus,
			this.form,
		];
	}

	async send() {
		try {
			await this.cacheService.clear([ 'setting', 'many' ]);
			await this.cacheService.clear([ 'setting', 'one' ]);
			await this.cacheService.clear([ 'formStatus', 'many' ]);
			await this.cacheService.clear([ 'formStatus', 'one' ]);
			await this.cacheService.clear([ 'fieldStatus', 'many' ]);
			await this.cacheService.clear([ 'fieldStatus', 'one' ]);
			await this.cacheService.clear([ 'contentStatus', 'many' ]);
			await this.cacheService.clear([ 'contentStatus', 'one' ]);
			await this.cacheService.clear([ 'form', 'many' ]);
			await this.cacheService.clear([ 'form', 'one' ]);

			await Bluebird.each(this.seeders, async (seeder) => {
				this.logger.log(`Seeding ${seeder.constructor.name}`);
				
				await seeder.send();
			});
		}
		catch (err) {
			console.error(`ERROR send: ${err.message}`);
		}
	}
}
