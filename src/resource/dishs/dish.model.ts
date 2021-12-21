import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishesService } from './dish.service';
import { DishesController } from './dish.controller';
import { DishRepository } from './dish.repository';



@Module({
  imports: [TypeOrmModule.forFeature([DishRepository])],
  controllers: [DishesController],
  providers: [DishesService],
  exports: [DishesService],
})
export class DishModel {}