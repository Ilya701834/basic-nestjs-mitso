import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesService } from './category.service';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { DishRepository } from '../dishs/dish.repository';



@Module({
  imports: [TypeOrmModule.forFeature([CategoryRepository, DishRepository])],
  controllers: [CategoryController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoryModel {}