import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async showAll() {
    const user = await this.userRepository.find();
    console.log(user);
    return user;
  }

  async create(userData: UserDto) {
    console.log('user dto------------------->', userData)
    const user = await this.userRepository.create(userData);
    console.log('created user------------------>', user);
    const savedUser = await this.userRepository.save(user);
    console.log('saved user ------------------->', savedUser);
    return user;
  }

  async readOne(id: string) {
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, userData: Partial<UserDto>) {
    await this.userRepository.update({ id }, userData);
    return this.userRepository.findOne({ id });
  }

  async delete(id: string) {
    await this.userRepository.delete({ id });
    return { deleted: true };
  }
}
