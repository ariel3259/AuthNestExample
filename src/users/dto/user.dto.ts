import { IsNotEmpty } from 'class-validator';

export default class UsersDto {
  id: number | null;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastName: string;
  roles: string;
}
