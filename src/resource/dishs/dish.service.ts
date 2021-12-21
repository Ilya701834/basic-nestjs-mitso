import { Injectable } from '@nestjs/common';

import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import Dish from './entities/dish.entity';
import { DishRepository } from './dish.repository';

@Injectable()
export class DishesService {
  constructor(
    private readonly dishesRepository: DishRepository,
  ) {}

  createDish = async (createDishDto: CreateDishDto): Promise<Dish> => {
    const dish = await this.dishesRepository.createDish(createDishDto);
    return dish;
  };

  getAll = async (): Promise<Dish[]> => this.dishesRepository.getAllDishes();

  getById = async (id: string): Promise<Dish | null> => {
    const dish = await this.dishesRepository.getById(id);
    if (!dish) return null;
    return dish;
  };

  deleteById = async (id: string): Promise<Dish | null> => {
    const dishDeletable = await this.dishesRepository.getById(id);
    if (!dishDeletable) return null;
    await this.dishesRepository.deleteById(id);

    return dishDeletable;
  };

  updateById = async (id: string, updateDishDto: UpdateDishDto): Promise<Dish | null> => {
    await this.dishesRepository.updateById(id, updateDishDto);
    const dish = await this.dishesRepository.getById(id);
    if (!dish) return null;
    return dish;
  };
}