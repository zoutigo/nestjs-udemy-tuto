import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResultInterface } from 'src/common/interface/paginate-result.interface';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService extends AbstractService {
  constructor(
    @InjectRepository(User) private readonly userRepositoty: Repository<User>,
  ) {
    super(userRepositoty);
  }

  async all(): Promise<User[]> {
    return this.userRepositoty.find();
  }

  async paginate(
    page = 1,
    relations: any[] = [],
  ): Promise<PaginatedResultInterface> {
    const { data, meta } = await super.paginate(page, relations);

    return {
      data: data.map((u) => {
        const { password, ...rest } = u;
        return rest;
      }),
      meta,
    };
  }
}
