import { PrimaryGeneratedColumn } from 'typeorm';
import { Entity, Column } from 'typeorm';

@Entity({
  name: 'users',
})
export default class User {
  @PrimaryGeneratedColumn({
    name: 'id_user',
  })
  id: number;

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
  })
  age: number;

  @Column({
    name: 'gender',
    type: 'varchar',
    length: 100,
  })
  gender: string;

  @Column({
    name: 'mobile',
    type: 'varchar',
    length: 100,
  })
  mobile: string;

  @Column({
    name: 'address',
    type: 'varchar',
    length: 500,
  })
  address: string;
}
