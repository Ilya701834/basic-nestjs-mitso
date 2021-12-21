import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HttpExceptionFilter } from './filter/http-exception.filter';

import { TypeormService } from './common';
import { UsersModule } from './resource/users/users.module';
import { MenuModule } from './resource/menus/menu.model';
import { CategoryModel } from './resource/categorys/category.model';
import { DishModel } from './resource/dishs/dish.model';
import { AuthModule } from './resource/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeormService,
    }),
    AuthModule,
    UsersModule,
    MenuModule,
    CategoryModel,
    DishModel
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}