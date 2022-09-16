import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepositoty: Repository<User>,
  ) {}

  async all(): Promise<User[]> {
    return this.userRepositoty.find();
  }

  async paginate(page = 1): Promise<any> {
    const take = 15;

    const [users, total] = await this.userRepositoty.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: users.map((u) => {
        const { password, ...rest } = u;
        return rest;
      }),
      total,
      page,
      lastPage: Math.ceil(total / take),
    };
  }

  async create(data): Promise<User> {
    return this.userRepositoty.save(data);
  }

  async findOne(condition): Promise<User> {
    return this.userRepositoty.findOne({ where: condition });
  }

  async update(id: number, data): Promise<any> {
    return this.userRepositoty.update(id, data);
  }
  async delete(id: number): Promise<any> {
    return this.userRepositoty.delete(id);
  }
}
