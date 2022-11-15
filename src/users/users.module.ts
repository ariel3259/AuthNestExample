import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import Users from './user.model';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
