import { IProduct, IProductQuery, IProductResponse } from '../models/interfaces/product-interface';
import ProductSchema from '../models/schemas/product-schema';
import { ObjectId } from 'mongoose';

class ProductRepository {
  async find (query: IProductQuery): Promise<IProductResponse[] | null> {
    if (query.department && query.brand) {
      return await ProductSchema.find({ department: { $regex: query.department }, brand: { $regex: query.brand } });
    } else if (query.department) {
      return await ProductSchema.find({ department: { $regex: query.department } });
    } else if (query.brand) {
      return await ProductSchema.find({ brand: { $regex: query.brand } });
    } else {
      return await ProductSchema.find();
    }
  }

  async findById (id: ObjectId): Promise<IProductResponse | null> {
    return ProductSchema.findById({ _id: id });
  }

  async findByBarCode (barCodes: String): Promise<Boolean> {
    const result = await ProductSchema.findOne({ bar_codes: barCodes });
    return result !== null;
  }

  async create (payload: IProduct): Promise<IProductResponse | null> {
    return ProductSchema.create(payload);
  }

  async deleteByID (id: ObjectId): Promise<void> {
    await ProductSchema.findByIdAndDelete({ _id: id });
  }
}

export default new ProductRepository();
