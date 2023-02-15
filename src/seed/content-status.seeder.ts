import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { ContentStatus } from '../api/content-status/content-status.entity';
import {
	USER_DEFAULT_ID,
	CONTENT_STATUS_ACTIVE_ID,
} from './consts';

export class ContentStatusSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(ContentStatus) private readonly contentStatusRepository: Repository<ContentStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: CONTENT_STATUS_ACTIVE_ID,
				userId: USER_DEFAULT_ID,
				name: 'Active',
				description: 'Content is active.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.contentStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: ContentStatus 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: ContentStatus 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}