import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import UsersDto from './dto/user.dto';
import Users from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly userRepository: typeof Users,
  ) {}

  async findOne(username: string): Promise<Users | undefined> {
    return await this.userRepository.findOne({
      where: {
        username: username,
        active: true,
      },
    });
  }

  async register(userDto: UsersDto): Promise<void> {
    const salt: string = await bcrypt.genSalt(12);
    userDto.password = await bcrypt.hash(userDto.password, salt);
    await this.userRepository.create({ ...userDto });
  }
}
