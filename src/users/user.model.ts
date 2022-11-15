import { Model, Table, Column, HasOne, ForeignKey } from 'sequelize-typescript';
import Roles from 'src/roles/roles.model';

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
  @HasOne(() => Roles)
  roles: Roles;
  @Column({ defaultValue: true })
  state: boolean;
}
