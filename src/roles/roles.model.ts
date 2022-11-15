import { Model, Table, Column, ForeignKey } from 'sequelize-typescript';
import Users from 'src/users/user.model';

@Table
export default class Roles extends Model {
  @Column({ unique: true })
  name: string;
  @Column({ defaultValue: true })
  state: boolean;
  @ForeignKey(() => Users)
  userId: number;
}
