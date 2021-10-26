import "dotenv/config";
import "reflect-metadata";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { Customer } from "../../../src/modules/customers/infra/typeorm/entities/Customer";
import app from "../../../src/shared/infra/http/app";
import factory from "../../factory";

let dbConnection: Connection;
async function cleanAll(entities: { name: string; tableName: string }[]) {
  try {
    for (const entity of entities) {
      const repository = dbConnection.getRepository(entity.name);
      await repository.query(`TRUNCATE ${entity.tableName} CASCADE;`);
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}
describe("CustomerController", () => {
  beforeAll(async () => {
    dbConnection = await createConnection();
  });
  afterAll(async () => {
    const entities: { name: string; tableName: string }[] = [];
    dbConnection.entityMetadatas.forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName })
    );
    await cleanAll(entities);
    await dbConnection.close();
  });
  test("should be able to create a new customer", async () => {
    const { name, email } = await factory.attrs<Customer>("Customer");
    await request(app)
      .post("/customer")
      .send({ name, email })
      .set("Accept", "application/json")
      .expect(200)
      .then((res) => {
        const costumer = res.body;
        expect(costumer).toHaveProperty("id");
      });
  });
});
