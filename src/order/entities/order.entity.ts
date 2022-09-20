import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude()
  firstname: string;

  @Column()
  @Exclude()
  lastname: string;

  @Column()
  email: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @Expose()
  get name(): string {
    return `${this.firstname} ${this.lastname}`;
  }
  @Expose()
  get total(): number {
    return this.orderItems.reduce((sum, i) => sum + i.quantity * i.price, 0);
  }
}
