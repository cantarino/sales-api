import { getManager, getRepository, Repository } from "typeorm";
import { Product } from "../../../../products/infra/typeorm/entities/Product";
import { IInsertOrder } from "../../../domain/models/IInsertOrder";
import { IOrdersRepository } from "../../../domain/repositories/IOrdersRepository";
import { Order } from "../entities/Order";

export class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ["order_products", "customer"],
    });

    return order;
  }

  public async createOrderAndUpdateStock({
    customer,
    products,
    productsStock,
  }: IInsertOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.getRepository(Order).save(order);

      const { order_products } = order;
      const updatedStock = order_products.map((order_product) => ({
        id: order_product.product_id,
        quantity:
          productsStock.filter((p) => p.id === order_product.product_id)[0]
            .quantity - order_product.quantity,
      }));

      await transactionalEntityManager
        .getRepository(Product)
        .save(updatedStock);
    });

    return order;
  }
}
