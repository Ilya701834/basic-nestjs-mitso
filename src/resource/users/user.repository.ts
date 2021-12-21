import { EntityRepository, AbstractRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UserRepository extends AbstractRepository<User> {
  createUser(createUserDto: CreateUserDto) {
    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  getAllUsers() {
    return this.repository.find();
  }

  getById(id: string) {
    return this.repository.findOne({ id });
  }

  updateById(id: string, updateUserDto: UpdateUserDto) {
    return this.repository.update({ id }, updateUserDto);
  }

  deleteById(id: string) {
    return this.repository.delete({ id });
  }

  findByCredentials(login: string) {
    return this.repository.findOne({ login });
  }

}