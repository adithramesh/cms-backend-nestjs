import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './articles.schema';

@Injectable()
export class ArticlesRepository {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: Model<Article>,
  ) {}

  async create(data: Partial<Article>) {
    return this.articleModel.create(data);
  }

  async findById(id: string) {
    return this.articleModel.findById(id).exec();
  }

  async updateById(id: string, data: Partial<Article>) {
    return this.articleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async deleteById(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }

  async findAll() {
    return this.articleModel
      .find()
      .populate('author', 'name email -_id')
      .exec();
  }
}
