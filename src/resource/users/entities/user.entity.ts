import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public login!: string;

  @Column()
  public password!: string;

  @BeforeInsert()
  generatePasswordHash() {
    this.password = bcrypt.hashSync(this.password, 10);
  }

  static toResponse({ id, login, name }: User) {
    return { id, login, name };
  }
}