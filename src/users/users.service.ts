import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import UsersDto from './dto/user.dto';
import Users from './user.model';
import * as bcrypt from 'bcrypt';
import Roles from 'src/roles/roles.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users) private readonly userRepository: typeof Users,
    @InjectModel(Roles) private readonly rolesRepository: typeof Roles,
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
    const roles: Roles = await this.rolesRepository.findOne({
      where: {
        name: userDto.roles,
        status: true,
      },
    });
    const salt: string = await bcrypt.genSalt(12);
    userDto.password = await bcrypt.hash(userDto.password, salt);
    await this.userRepository.create({ ...userDto, roles });
  }
}
