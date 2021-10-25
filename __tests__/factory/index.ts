import factory from "factory-girl";
import { Customer } from "../../src/modules/customers/infra/typeorm/entities/Customer";
import { Product } from "../../src/modules/products/infra/typeorm/entities/Product";

factory.define("Customer", Customer, {
  name: factory.sequence("Customer.name", (n) => `Test Customer ${n}`),
  email: factory.sequence(
    "Customer.email",
    (n) => `customer.test${n}@test.com`
  ),
});

factory.define("Product", Product, {
  name: factory.sequence("Product.name", (n) => `Test Product ${n}`),
  price: 123.45,
  quantity: 10,
});

export default factory;
