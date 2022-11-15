import { IsNotEmpty, IsNumber } from 'class-validator';
export default class ArticlesDto {
  id: number | null;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  stock: number;
}
