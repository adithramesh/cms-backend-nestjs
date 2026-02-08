import { Article } from './articles.schema';

export interface IArticlesRepository {
  create(data: Partial<Article>): Promise<Article>;
  findById(id: string): Promise<Article | null>;
  findByIdPopulated(id: string): Promise<Article | null>;
  updateById(id: string, data: Partial<Article>): Promise<Article | null>;
  deleteById(id: string): Promise<Article | null>;
  findAll(): Promise<Article[]>;
  findByAuthor(userId: string): Promise<Article[]>;
}

export const ARTICLES_REPOSITORY = 'ARTICLES_REPOSITORY';
