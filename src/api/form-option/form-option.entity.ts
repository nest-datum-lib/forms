import { 
	PrimaryGeneratedColumn,
	Entity, 
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';
import { FormFormOption } from '../form-form-option/form-form-option.entity';

@Entity()
export class FormOption {
	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ default: '' })
	public userId: string;

	@Column({ default: '' })
	public dataTypeId: string;

	@Column()
	public name: string;

	@Column({ default: '' })
	public description: string;

	@Column({ default: '' })
	public defaultValue: string;

	@Column({ default: '' })
	public regex: string;

	@Column('boolean', { default: false })
	public isRequired: boolean;

	@Column('boolean', { default: false })
	public isMultiline: boolean;

	@Column('boolean', { default: false })
	public isNotDelete: boolean = false;

	@Column('boolean', { default: false })
	public isDeleted: boolean = false;

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

	@OneToMany(() => FormFormOption, (formFormOption) => formFormOption.formOption)
	public formFormOptions: FormFormOption[];
}
