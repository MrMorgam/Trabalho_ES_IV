import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @Inject()
    private readonly entityManager: EntityManager
  ) {}

  // create(createUserDto: CreateUserDto) {
  //   const user = this.UserRepository.create(createUserDto);
  //   return this.UserRepository.save(user);
  // }

  create(createUserDto: CreateUserDto) {
    const user = this.entityManager.create(User, createUserDto);
    return this.entityManager.save(user);
  }

  findAll() {
    return this.entityManager.find(User);
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
