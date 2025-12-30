import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { Types } from 'mongoose';

@Injectable()
export class ArticlesService {
  constructor(private readonly repo: ArticlesRepository) {}

  create(title: string, content: string, userId: string) {
    return this.repo.create({
      title,
      content,
      author: new Types.ObjectId(userId),
    });
  }

  async update(
    articleId: string,
    userId: string,
    data: { title?: string; content?: string },
  ) {
    const article = await this.repo.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author.toString() !== userId) {
      throw new ForbiddenException('You are not the author');
    }

    return this.repo.updateById(articleId, data);
  }

  async delete(articleId: string, userId: string) {
    const article = await this.repo.findById(articleId);
    if (!article) {
      throw new NotFoundException('Article not found');
    }

    if (article.author.toString() !== userId) {
      throw new ForbiddenException('You are not the author');
    }

    await this.repo.deleteById(articleId);
    return { message: 'Artice deleted succesfully' };
  }

  findAll() {
    return this.repo.findAll();
  }
}
