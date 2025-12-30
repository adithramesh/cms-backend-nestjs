import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [ArticlesService, ArticlesRepository],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
