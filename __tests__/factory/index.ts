import factory from "factory-girl";
import { Customer } from "../../src/modules/customers/infra/typeorm/entities/Customer";

factory.define("Customer", Customer, {
  name: factory.sequence("Customer.name", (n) => `Test Customer ${n}`),
  email: factory.sequence(
    "Customer.email",
    (n) => `customer.test${n}@test.com`
  ),
});

export default factory;
