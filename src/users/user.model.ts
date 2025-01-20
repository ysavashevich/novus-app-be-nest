import { Column, Model, Table, Unique } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  fullName: string;

  @Unique
  @Column
  email: string;

  @Column
  phoneNumber: string;

  @Column
  password: string;

  @Column
  userType: string;
}
