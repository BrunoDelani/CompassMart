import { IProduct, IProductResponse } from '../models/interfaces/product-interface';
import ProductSchema from '../models/schemas/product-schema';

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse|null> {
    return ProductSchema.create(payload);
  }
}

export default new ProductRepository();
