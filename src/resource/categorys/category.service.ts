import { Injectable } from '@nestjs/common';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from './entities/category.entity';
import { CategoryRepository } from './category.repository';
import { DishRepository } from '../dishs/dish.repository';
import Dish from '../dishs/entities/dish.entity';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoryRepository,
    private readonly dishesRepository: DishRepository,
  ) {}

  createCategory = async (createCategoryDto: CreateCategoryDto): Promise<Category> => {
    const category = await this.categoriesRepository.createUser(createCategoryDto);
    return category;
  };

  getAll = async (): Promise<Category[]> => this.categoriesRepository.getAllUsers();

  getById = async (id: string): Promise<Category | null> => {
    const category = await this.categoriesRepository.getById(id);
    if (!category) return null;
    return category;
  };

  deleteById = async (id: string): Promise<Category | null> => {
    const categoryDeletable = await this.categoriesRepository.getById(id);
    if (!categoryDeletable) return null;
    await this.categoriesRepository.deleteById(id);
    await this.dishesRepository.deleteByCategoryId(id)

    return categoryDeletable;
  };

  updateById = async (id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> => {
    await this.categoriesRepository.updateById(id, updateCategoryDto);
    const category = await this.categoriesRepository.getById(id);
    if (!category) return null;
    return category;
  };

  getAllDishes =  (id: string): Promise<Dish[]> =>  this.dishesRepository.getDishByCategoryId(id);

  }