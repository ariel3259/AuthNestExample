import { Model, Table, Column } from 'sequelize-typescript';

@Table
export default class Roles extends Model {
  @Column({ unique: true })
  name: string;
  @Column({ defaultValue: true })
  state: boolean;
}