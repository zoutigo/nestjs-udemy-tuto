import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginatedResultInterface } from 'src/common/interface/paginate-result.interface';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {
    super(orderRepository);
  }

  async paginate(
    page = 1,
    relations?: any[],
  ): Promise<PaginatedResultInterface> {
    const { data, meta } = await super.paginate(page, relations);
    return {
      data: data.map((order: Order) => ({
        id: order.id,
        name: order.name,
        email: order.email,
        total: order.total,
        createdAt: order.createdAt,
        orderItems: order.orderItems,
      })),
      meta,
    };
  }
}
