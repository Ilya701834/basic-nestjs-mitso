import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './user.controller';
import { UserRepository } from './user.repository';



@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}