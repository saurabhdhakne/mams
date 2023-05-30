import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    name: 'first_name',
    type: 'varchar',
    length: 50,
  })
  firstName: string;

  @Column({
    name: 'middle_name',
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  middleName: string;

  @Column({
    name: 'last_name',
    type: 'varchar',
    length: 50,
  })
  lastName: string;

  @Column({
    name: 'age',
    type: 'int',
    nullable: true,
  })
  age: number;

  @Column({
    name: 'gender',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  gender: string;

  @Column({
    name: 'mobile',
    type: 'varchar',
    length: 20,
  })
  mobile: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  address: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
