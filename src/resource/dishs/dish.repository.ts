import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import Dish from './entities/dish.entity';

@EntityRepository(Dish)
export class DishRepository extends AbstractRepository<Dish> {
  createDish(createDishDto: CreateDishDto) {
    const dish = this.repository.create(createDishDto);
    return this.repository.save(dish);
  }

  getAllDishes() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, updateMenuDto: UpdateDishDto) {
    return this.repository.update({ id }, updateMenuDto);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  deleteByCategoryId(id: string) {
    return this.repository.delete({categoryId: id });
  }

  getDishByCategoryId(id: string) {
    return this.repository.find({ categoryId:id});
  }

}