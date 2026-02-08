import { Article } from './articles.schema';

export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  author: {
    id?: string;
    username?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleListResponse {
  total: number;
  blogs: ArticleResponse[];
}

export interface IArticlesService {
  create(
    title: string,
    content: string,
    userId: string,
  ): Promise<{ message: string } & ArticleResponse>;

  update(
    articleId: string,
    userId: string,
    data: { title?: string; content?: string },
  ): Promise<{ message: string } & ArticleResponse>;

  delete(
    articleId: string,
    userId: string,
  ): Promise<{ success: boolean; message: string }>;

  findAll(): Promise<ArticleListResponse>;

  findOne(id: string): Promise<ArticleResponse>;

  findById(articleId: string): Promise<Article | null>;

  findMyArticles(userId: string): Promise<ArticleListResponse>;
}

export const ARTICLES_SERVICE = 'ARTICLES_SERVICE';
