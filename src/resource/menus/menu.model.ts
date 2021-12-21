import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenusService } from './menu.service';
import { MenusController } from './menu.controller';
import { MenuRepository } from './menu.repository';
import { CategoryRepository } from '../categorys/category.repository';
import { DishRepository } from '../dishs/dish.repository';



@Module({
  imports: [TypeOrmModule.forFeature([MenuRepository, CategoryRepository, DishRepository])],
  controllers: [MenusController],
  providers: [MenusService],
  exports: [MenusService],
})
export class MenuModule {}