import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { FieldStatus } from '../api/field-status/field-status.entity';
import {
	USER_DEFAULT_ID,
	FIELD_STATUS_ACTIVE_ID,
} from './consts';

export class FieldStatusSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(FieldStatus) private readonly fieldStatusRepository: Repository<FieldStatus>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: FIELD_STATUS_ACTIVE_ID,
				userId: USER_DEFAULT_ID,
				name: 'Active',
				description: 'Field is active.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.fieldStatusRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: FieldStatus 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: FieldStatus 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}