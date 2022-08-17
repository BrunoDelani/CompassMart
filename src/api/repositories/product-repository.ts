import { IProduct, IProductResponse } from '../models/interfaces/product-interface';
import ProductSchema from '../models/schemas/product-schema';
import { ObjectId } from 'mongoose';

class ProductRepository {
  async findById (id: ObjectId): Promise<IProductResponse | null> {
    return await ProductSchema.findById({ _id: id });
  }

  async findByBarCode (barCodes: String): Promise<Boolean> {
    const result = await ProductSchema.findOne({ bar_codes: barCodes });
    return result !== null;
  }

  async create (payload: IProduct): Promise<IProductResponse | null> {
    return ProductSchema.create(payload);
  }
}

export default new ProductRepository();
