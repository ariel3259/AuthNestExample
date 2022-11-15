import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Page from 'src/dto/page.dto';
import Roles from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Roles) private readonly rolesRepository: typeof Roles,
  ) {}

  async getAll(offset: number, limit: number): Promise<Page<Roles>> {
    const roles: Roles[] = await this.rolesRepository.findAll({
      offset,
      limit,
      where: {
        state: true,
      },
    });
    const totalItems: number = await this.rolesRepository.count({
      where: {
        state: true,
      },
    });
    return {
      elements: roles,
      totalItems,
    };
  }
}
