import { Injectable } from '@nestjs/common';

import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import Menu from './entities/menu.entity';
import { MenuRepository } from './menu.repository';
import { CategoryRepository } from '../categorys/category.repository';
import { DishRepository } from '../dishs/dish.repository';
import Category from '../categorys/entities/category.entity';

@Injectable()
export class MenusService {
  constructor(
    private readonly menusRepository: MenuRepository,
    private readonly categoryRepository : CategoryRepository,
    private readonly dishRepository : DishRepository,
  ) {}

  createMenu = async (createMenuDto: CreateMenuDto): Promise<Menu> => {
    const menu = await this.menusRepository.createMenu(createMenuDto);
    return menu;
  };

  getAll = async (): Promise<Menu[]> => this.menusRepository.getAllMenus();

  getById = async (id: string): Promise<Menu | null> => {
    const menu = await this.menusRepository.getById(id);
    if (!menu) return null;
    return menu;
  };

  deleteById = async (id: string): Promise<Menu | null> => {
    const menuDeletable = await this.menusRepository.getById(id);
    const categories = this.categoryRepository.getCategoryByMenuId(id)

    if (!menuDeletable) return null;
    await this.menusRepository.deleteById(id);
    await this.categoryRepository.deleteByMenuId(id)
    await categories.then(category=>{
      category.map(el=>this.dishRepository.deleteByCategoryId(el.id))
    })
    return menuDeletable;
  };

  updateById = async (id: string, updateMenuDto: UpdateMenuDto): Promise<Menu | null> => {
    await this.menusRepository.updateById(id, updateMenuDto);
    const menu = await this.menusRepository.getById(id);
    if (!menu) return null;
    return menu;
  };

  getAllCategory = (id: string): Promise<Category[]> => this.categoryRepository.getCategoryByMenuId(id);

}