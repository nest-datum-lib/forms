import { Entity } from 'typeorm';
import { Status as NestDatumStatus } from '@nest-datum/status';

@Entity()
export class ReportStatus extends NestDatumStatus {
}
