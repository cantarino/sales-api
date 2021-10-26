import factory from "factory-girl";
import { Customer } from "../../src/modules/customers/infra/typeorm/entities/Customer";
import { Product } from "../../src/modules/products/infra/typeorm/entities/Product";
import { User } from "../../src/modules/users/infra/typeorm/entities/User";

factory.define("Customer", Customer, {
  name: factory.sequence("Customer.name", (n) => `Customer ${n}`),
  email: factory.sequence(
    "Customer.email",
    (n) => `customer.test${n}@test.com`
  ),
});

factory.define("Product", Product, {
  name: factory.sequence("Product.name", (n) => `Product ${n}`),
  price: 123.45,
  quantity: 10,
});

factory.define("User", User, {
  name: factory.sequence("User.name", (n) => `User ${n}`),
  email: factory.sequence("User.email", (n) => `user-${n}@test.com`),
  password: factory.sequence("User.password", (n) => `user-${n}-password`),
});

export default factory;
