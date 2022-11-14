import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Articles from './articles.model';
import Page from 'src/dto/page.dto';
import ArticlesDto from './dto/articles.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Articles) private readonly repository: typeof Articles,
  ) {}

  async getAll(offset: number, limit: number): Promise<Page<Articles>> {
    const articles: Articles[] = await this.repository.findAll({
      offset,
      limit,
      where: {
        status: true,
      },
    });
    const totalItems: number = await this.repository.count({
      where: {
        status: true,
      },
    });
    return {
      elements: articles,
      totalItems,
    };
  }

  async save(articlesDto: ArticlesDto): Promise<Articles> {
    const articlesSaved: Articles = await this.repository.create({
      ...articlesDto,
    });
    return articlesSaved;
  }

  async update(articlesDto: ArticlesDto, id: number): Promise<Articles> {
    await this.repository.update(
      {
        ...articlesDto,
      },
      {
        where: {
          status: true,
          id,
        },
      },
    );
    const articleModified: Articles = await this.repository.findOne({
      where: {
        status: true,
        id,
      },
    });
    return articleModified;
  }

  async delete(id: number): Promise<void> {
    await this.repository.update(
      {
        status: true,
      },
      {
        where: {
          id,
          status: true,
        },
      },
    );
  }
}
