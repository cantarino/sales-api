import { Product } from "@modules/products/infra/typeorm/entities/Product";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IOrderProduct } from "../../../domain/models/IOrderProduct";
import { Order } from "./Order";

@Entity("orders_products")
export class OrderProduct implements IOrderProduct {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  order_id: string;

  @ManyToOne(() => Order, (order) => order.order_products)
  @JoinColumn({ name: "order_id" })
  order: Order;

  @Column()
  product_id: string;

  @ManyToOne(() => Product, (product) => product.orders_product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column("decimal")
  price: number;

  @Column("int")
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
