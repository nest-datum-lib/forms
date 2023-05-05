import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { Form } from '../form/form.entity';
import { FieldContent } from '../field-content/field-content.entity';

@Entity()
export class Content {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public userId: string;

	@Column({ default: '' })
	public formId: string;

	@ManyToOne(() => Form, (form) => form.contents, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	public form: Form;

	@Column({ default: '' })
	public contentStatusId: string;

	@Column('boolean', { default: false })
	public isDeleted: boolean = false;

	@Column('boolean', { default: false })
	public isNotDelete: boolean;

	@CreateDateColumn({ 
		type: 'timestamp', 
		precision: null,
		default: () => 'CURRENT_TIMESTAMP', 
	})
	public createdAt: Date;

	@UpdateDateColumn({ 
		type: 'timestamp', 
		precision: null,
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP', 
	})
	public updatedAt: Date;

	@OneToMany(() => FieldContent, (fieldContent) => fieldContent.content, {
		cascade: true,
	})
	public fieldContents: FieldContent[];
}
