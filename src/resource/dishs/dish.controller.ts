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

import { DishesService } from './dish.service';
import Dish from './entities/dish.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('dishes')
@UseGuards(AuthGuard)
@UseFilters(HttpExceptionFilter)
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Get('/')
  async getAll(@Req() _req: Request, @Res() res: Response) {
    const dishes = await this.dishesService.getAll();
    return res.status(StatusCodes.OK).json(dishes.map(Dish.toResponse));
  }

  @Post('/')
  async createDish(@Req() req: Request, @Res() res: Response) {
    const dish = await this.dishesService.createDish(req.body);

    if (dish) {
      res.status(StatusCodes.CREATED).json(Dish.toResponse(dish));
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ code: 'DISH_NOT_CREATE', msg: 'Dish not create' });
    }
  }

  @Get('/:id')
  async getById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const dish = await this.dishesService.getById(id || '');

    if (dish) {
      res.json(Dish.toResponse(dish));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  }

  @Put('/:id')
  async updateDish(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const dish = await this.dishesService.updateById(id!, req.body);

    if (dish) {
      res.status(StatusCodes.OK).json(Dish.toResponse(dish));
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
  }

  @Delete('/:id')
  async deleteById(@Req() req: Request, @Res() res: Response) {
    const { id } = req.params;

    const dish = await this.dishesService.deleteById(id || '');

    if (!dish) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'DISH_NOT_FOUND', msg: 'Dish not found' });
    }
    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'DISH_DELETED', msg: 'The dish has been deleted' });
  }
}