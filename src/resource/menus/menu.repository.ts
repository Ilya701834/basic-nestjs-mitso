import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import Menu from './entities/menu.entity';

@EntityRepository(Menu)
export class MenuRepository extends AbstractRepository<Menu> {
  createMenu(createMenuDto: CreateMenuDto) {
    const menu = this.repository.create(createMenuDto);
    return this.repository.save(menu);
  }

  getAllMenus() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, updateMenuDto: UpdateMenuDto) {
    return this.repository.update({ id }, updateMenuDto);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  getCategoryByMenuId(id: string) {
    return this.repository.find({ id });
  }

}