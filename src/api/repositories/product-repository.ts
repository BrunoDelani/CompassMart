import { IProduct, IProductResponse } from '../models/interfaces/product-interface';
import ProductSchema from '../models/schemas/product-schema';

class ProductRepository {
  async create (payload: IProduct): Promise<IProductResponse|null> {
    return ProductSchema.create(payload);
  }

  async findByBarCode (barCodes: String) : Promise<Boolean> {
    const result = await ProductSchema.findOne({ bar_codes: barCodes });
    return result !== null;
  }
}

export default new ProductRepository();
