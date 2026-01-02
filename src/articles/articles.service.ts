import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ArticlesRepository } from './articles.repository';
import { Types } from 'mongoose';
import { log } from 'console';

@Injectable()
export class ArticlesService {
  constructor(private readonly repo: ArticlesRepository) {}

  async create(title: string, content: string, userId: string) {
    const article = await this.repo.create({
      title,
      content,
      author: new Types.ObjectId(userId),
    });

    return {
      message: 'Content created successfully',
      ...this.mapArticle(article),
    };
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

    const updated = await this.repo.updateById(articleId, data);

    return {
      message: 'Blog updated successfully',
      ...this.mapArticle(updated),
    };
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
    return { success: true, message: 'Article deleted succesfully' };
  }

  async findAll() {
    const articles = await this.repo.findAll();
    return this.mapArticleList(articles);
  }

  async findOne(id: string) {
    const article = await this.repo.findByIdPopulated(id);
    if (!article) {
      throw new NotFoundException('Article not found');
    }
    return this.mapArticle(article);
  }

  async findById(articleId: string) {
    return await this.repo.findById(articleId);
  }

  async findMyArticles(userId: string) {
    const articles = await this.repo.findByAuthor(userId);
    return this.mapArticleList(articles);
  }

  private mapArticle(article: any) {
    return {
      id: article._id.toString(),
      title: article.title,
      content: article.content,
      imageUrl: article.imageUrl ?? undefined,
      author: {
        id: article.author?._id?.toString(),
        username: article.author?.name,
      },
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
    };
  }

  private mapArticleList(articles: any[]) {
    return {
      total: articles.length,
      blogs: articles.map((article) => this.mapArticle(article)),
    };
  }
}
