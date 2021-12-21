import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters, UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';

import { CategoriesService } from './category.service';
import Category from './entities/category.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('categories')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response) {
    const categories = await this.categoriesService.getAll();
    return res.status(StatusCodes.OK).json(categories.map(Category.toResponse));
  }

  @Post('/')
  async createCategory(@Req() req: Request, @Res() res: Response) {
    const category = await this.categoriesService.createCategory(req.body);

    if (category) {
      res.status(StatusCodes.CREATED).json(Category.toResponse(category));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'CATEGORY_NOT_CREATE', msg: 'Category not create' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const category = await this.categoriesService.getById(id || '');

    if (category) {
      res.json(Category.toResponse(category));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  }

  @Put('/:id')
  async updateCategory(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const category = await this.categoriesService.updateById(id!, req.body);

    if (category) {
      res.status(StatusCodes.OK).json(Category.toResponse(category));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const category = await this.categoriesService.deleteById(id || '');

    if (!category) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'CATEGORY_DELETED', msg: 'The category has been deleted' });
  }
}