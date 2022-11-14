import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import Page from 'src/dto/page.dto';
import Articles from './articles.model';
import { ArticlesService } from './articles.service';
import ArticlesDto from './dto/articles.dto';
import JwtGuard from 'src/auth/jwt-auth.guard';
import { InternalServerErrorException } from '@nestjs/common';
import { Response } from 'express';

@UseGuards(JwtGuard)
@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  async getAll(
    @Query('offset') offset: string,
    @Query('limit') limit: string,
    @Res() res: Response<ArticlesDto[]>,
  ): Promise<void> {
    try {
      const paginatedArticles: Page<Articles> = await this.service.getAll(
        parseInt(offset),
        parseInt(limit),
      );
      const articlesResponse: ArticlesDto[] = paginatedArticles.elements.map(
        (e: Articles) => ({
          id: e.id,
          name: e.name,
          description: e.description,
          price: e.price,
          stock: e.stock,
        }),
      );
      res.set({
        'x-total-count': paginatedArticles.totalItems,
      });
      res.json(articlesResponse);
    } catch (err) {
      const message: string =
        err instanceof Error ? err.message : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }

  @Post()
  async save(@Body() request: ArticlesDto): Promise<ArticlesDto> {
    try {
      const articleSaved: Articles = await this.service.save(request);
      return {
        id: articleSaved.id,
        name: articleSaved.name,
        description: articleSaved.description,
        price: articleSaved.price,
        stock: articleSaved.stock,
      };
    } catch (err) {
      const message: string =
        err instanceof Error ? err.message : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }

  @Put(':id')
  async update(
    @Body() request: ArticlesDto,
    @Param('id') id: number,
  ): Promise<ArticlesDto> {
    try {
      const articleModified: Articles = await this.service.update(request, id);
      return {
        id: articleModified.id,
        name: articleModified.name,
        description: articleModified.description,
        price: articleModified.price,
        stock: articleModified.stock,
      };
    } catch (err) {
      const message: string =
        err instanceof Error ? err.message : 'unknown error';
      throw new InternalServerErrorException(message);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() res: Response): Promise<void> {
    try {
      await this.service.delete(id);
      res.status(204).json(null);
    } catch (err) {
      const message: string =
        err instanceof Error ? err.message : 'unknown message';
      throw new InternalServerErrorException(message);
    }
  }
}
