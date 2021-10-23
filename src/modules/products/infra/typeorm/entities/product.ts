import { OrderProduct } from "@modules/orders/infra/typeorm/entities/OrderProduct";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IProduct } from "../../../domain/models/IProduct";

@Entity("products")
export class Product implements IProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @OneToMany(() => OrderProduct, (order_products) => order_products.product)
  orders_product: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
