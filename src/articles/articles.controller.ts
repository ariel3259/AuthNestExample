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
} from '@nestjs/common';
import Page from 'src/dto/page.dto';
import Articles from './articles.model';
import { ArticlesService } from './articles.service';
import ArticlesDto from './dto/articles.dto';
import { Response } from 'express';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  async getAll(
    @Query('offset') offset: number,
    @Query('limit') limit: number,
    @Res() res: Response,
  ): Promise<ArticlesDto[] | { message: string }> {
    try {
      const paginatedArticles: Page<Articles> = await this.service.getAll(
        offset,
        limit,
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
      return articlesResponse;
    } catch (err) {
      const message: string =
        err instanceof Error ? err.message : 'unknown error';
      res.status(500);
      return { message };
    }
  }

  @Post()
  async save(
    @Body() request: ArticlesDto,
    @Res() res: Response,
  ): Promise<ArticlesDto | { message: string }> {
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
      res.status(500);
      return { message };
    }
  }

  @Put(':id')
  async update(
    @Body() request: ArticlesDto,
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ArticlesDto | { message: string }> {
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
      res.status(500);
      return { message };
    }
  }

  @Delete(':id')
  async delete(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<void | { message: string }> {
    try {
      await this.service.delete(id);
      res.status(204);
    } catch (err) {
      const message: string =
        err instanceof Error ? err.message : 'unknown message';
      res.status(500);
      return { message };
    }
  }
}
