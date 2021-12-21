import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import Category from './entities/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends AbstractRepository<Category> {
  createUser(createCategoryDto: CreateCategoryDto) {
    const category = this.repository.create(createCategoryDto);
    return this.repository.save(category);
  }

  getAllUsers() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.repository.update({ id }, updateCategoryDto);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  deleteByMenuId(id: string) {
    return this.repository.delete({menuId: id });
  }

  getCategoryByMenuId(id: string) {
    return this.repository.find({ menuId:id});
  }

}