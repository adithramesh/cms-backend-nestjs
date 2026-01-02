import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body, @Req() req) {
    return await this.articlesService.create(
      body.title,
      body.content,
      req.user.userId,
    );
  }

  @Get()
  async findAllArticle() {
    return await this.articlesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyArticles(@Req() req) {
    console.log(req.user.userId);
    return await this.articlesService.findMyArticles(req.user.userId);
  }

  @Get(':id')
  async findArticleById(@Param('id') id: string) {
    return await this.articlesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body, @Req() req) {
    return this.articlesService.update(id, req.user.userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.articlesService.delete(id, req.user.userId);
  }
}
