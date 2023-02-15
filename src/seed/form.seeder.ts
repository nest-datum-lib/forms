import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { 
	Repository,
	Connection, 
} from 'typeorm';
import { Promise as Bluebird } from 'bluebird';
import { v4 as uuidv4 } from 'uuid';
import { Form } from '../api/form/form.entity';
import {
	USER_DEFAULT_ID,
	FORM_CV_ID,
	FORM_STATUS_ACTIVE_ID,
} from './consts';

export class FormSeeder {
	constructor(
		private readonly connection: Connection,
		@InjectRepository(Form) private readonly formRepository: Repository<Form>,
	) {
	}

	async send() {
		const queryRunner = await this.connection.createQueryRunner(); 

		try {
			// new transaction
			await queryRunner.startTransaction();
			await Bluebird.each([{
				id: FORM_CV_ID,
				userId: USER_DEFAULT_ID,
				formStatusId: FORM_STATUS_ACTIVE_ID,
				name: 'CV form',
				description: 'Users CV profiles.',
				isNotDelete: true,
			}], async (data) => {
				try {
					await this.formRepository.insert(data);
				}
				catch (err) {
					await queryRunner.rollbackTransaction();

					console.error(`ERROR: Form 2: ${err.message}`);
				}
			});
			await queryRunner.commitTransaction();
		}
		catch (err) {
			await queryRunner.rollbackTransaction();

			console.error(`ERROR: Form 1: ${err.message}`);
		}
		finally {
			await queryRunner.release();
		}
	}
}