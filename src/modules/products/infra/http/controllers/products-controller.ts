import { Request, Response } from "express";
import { CreateProductService } from "../../../services/CreateProductService";
import { DeleteProductService } from "../../../services/DeleteProductService";
import { ListProductService } from "../../../services/ListProductService";
import { ShowProductService } from "../../../services/ShowProductService";
import { UpdateProductService } from "../../../services/UpdateProductService";

export class ProductsController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

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

    return response.status(204).json();
  }
}
