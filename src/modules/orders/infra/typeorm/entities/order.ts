import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IOrder } from "../../../domain/models/IOrder";
import { OrderProduct } from "./orders-products";

@Entity("orders")
export class Order implements IOrder {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer;

  @OneToMany(() => OrderProduct, (order_products) => order_products.order, {
    cascade: true,
  })
  order_products: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
