import { Module } from '@nestjs/common'
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Roles from './roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Roles])],
  providers: [RolesService],
  controllers: [RolesController],
})
export default class RolesModule {}