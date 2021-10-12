import { Request, Response } from "express";
import { CreateProductService } from "../services/create-product-service";
import { DeleteProductService } from "../services/delete-product-service";
import { ListProductService } from "../services/list-product-service";
import { ShowProductService } from "../services/show-product-service";
import { UpdateProductService } from "../services/update-product-service";

export class ProductsController {
  public async index(_: Request, res: Response) {
    const listProducts = new ListProductService();
    const products = listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showProduct = new ShowProductService();
    const { id } = req.params;
    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });

    return response.json({});
  }
}
