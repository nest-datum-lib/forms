import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { FormStatus } from '../api/form-status/form-status.entity';
import {
	USER_DEFAULT_ID,
	FORM_STATUS_ACTIVE_ID,
} from './consts';

export class FormStatusSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(FormStatus) private readonly formStatusRepository: Repository<FormStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: FORM_STATUS_ACTIVE_ID,
				userId: USER_DEFAULT_ID,
				name: 'Active',
				description: 'Form is active.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.formStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: FormStatus 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: FormStatus 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}