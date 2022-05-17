import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '../config/config.service';
import { CreateUserDto } from './dtos/req/create-user.dto';
import { UpdateUserDto } from './dtos/req/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = this.repo.create({ email, password });
    await this.repo.save(user);
    return user;
  }

  findAll() {
    return this.repo.find({});
  }

  findOne(id: number) {
    // console.log('find one id', id);
    return this.repo.findOne({ id });
  }

  findOneByEmail(email: string) {
    return this.repo.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repo.findOneOrFail({ id });
    Object.assign(user, updateUserDto);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.repo.findOneOrFail({ id });
    return await this.repo.remove(user);
  }
}
