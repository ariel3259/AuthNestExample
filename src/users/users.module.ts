import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Users from './user.model';
import Roles from 'src/roles/roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Users, Roles])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
