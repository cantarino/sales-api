import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateProductService } from "../../../services/CreateProductService";
import { DeleteProductService } from "../../../services/DeleteProductService";
import { ListProductService } from "../../../services/ListProductService";
import { ShowProductService } from "../../../services/ShowProductService";
import { UpdateProductService } from "../../../services/UpdateProductService";

export class ProductsController {
  public async index(_: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);
    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const showProduct = container.resolve(ShowProductService);
    const { id } = req.params;
    const product = await showProduct.execute({ id });

    return res.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProduct = container.resolve(CreateProductService);
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
    const updateProduct = container.resolve(UpdateProductService);
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
    const deleteProduct = container.resolve(DeleteProductService);
    await deleteProduct.execute({ id });

    return response.status(204).json();
  }
}
