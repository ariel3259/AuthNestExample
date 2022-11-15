import { Model, Table, Column } from 'sequelize-typescript';

@Table
export default class Users extends Model {
  @Column
  username: string;
  @Column
  password: string;
  @Column
  name: string;
  @Column
  lastName: string;
  @Column({ defaultValue: true })
  state: boolean;
}