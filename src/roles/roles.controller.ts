import { Controller, UseGuards, Get, Query, Res } from '@nestjs/common';
import JwtGuard from 'src/authentication/jwt-auth.guard';
import { RolesService } from './roles.service';
import { Response } from 'express';
import Roles from './roles.model';
import Page from 'src/dto/page.dto';

@UseGuards(JwtGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async getAll(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Res() res: Response<string[]>,
  ): Promise<void> {
    const paginatedRoles: Page<Roles> = await this.rolesService.getAll(
      parseInt(offset),
      parseInt(limit),
    );
    const roles: string[] = paginatedRoles.elements.map(
      (element) => element.name,
    );
    res
      .set({
        'x-total-count': paginatedRoles.totalItems,
      })
      .json(roles);
  }
}
