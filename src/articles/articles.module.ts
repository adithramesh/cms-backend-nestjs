import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { ArticlesRepository } from './articles.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Article, ArticleSchema } from './articles.schema';
import { ARTICLES_REPOSITORY } from './articles.repository.interface';
import { ARTICLES_SERVICE } from './articles.service.interface';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }]),
  ],
  providers: [
    {
      provide: ARTICLES_SERVICE,
      useClass: ArticlesService,
    },
    {
      provide: ARTICLES_REPOSITORY,
      useClass: ArticlesRepository,
    },
  ],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
