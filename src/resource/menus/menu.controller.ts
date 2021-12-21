import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res, UseFilters, UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpExceptionFilter } from '../../filter/http-exception.filter';

import { MenusService } from './menu.service';
import Menu from './entities/menu.entity';
import Category from '../categorys/entities/category.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('menus')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class MenusController {
  constructor(private readonly menusService: MenusService) {
  }

  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response) {
    const menus = await this.menusService.getAll();
    return res.status(StatusCodes.OK).json(menus.map(Menu.toResponse));
  }

  @Post('/')
  async createMenu(@Req() req: Request, @Res() res: Response) {
    const menu = await this.menusService.createMenu(req.body);

    if (menu) {
      res.status(StatusCodes.CREATED).json(Menu.toResponse(menu));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'MENU_NOT_CREATE', msg: 'Menu not create' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const menu = await this.menusService.getById(id || '');

    if (menu) {
      res.json(Menu.toResponse(menu));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  }

  @Put('/:id')
  async updateMenu(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const menu = await this.menusService.updateById(id!, req.body);

    if (menu) {
      res.status(StatusCodes.OK).json(Menu.toResponse(menu));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const menu = await this.menusService.deleteById(id || '');

    if (!menu) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'MENU_NOT_FOUND', msg: 'Menu not found' });
    }
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'MENU_DELETED', msg: 'The menu has been deleted' });
  }

  @Get('/:id/categories')
  async getCatygoriesById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;
    const categories = await this.menusService.getAllCategory(id || '');

    if (categories) {
      res.json(categories.map((el) => Category.toResponse(el)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CATEGORY_NOT_FOUND', msg: 'Category not found' });
    }
  }
}