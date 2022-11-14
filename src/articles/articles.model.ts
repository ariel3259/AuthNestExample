import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table
export default class Articles extends Model {
  @Column
  name: string;

  @Column
  description: string;

  @Column(DataType.DOUBLE)
  price: number;

  @Column
  stock: number;

  @Column({ defaultValue: true })
  status: boolean;
}
