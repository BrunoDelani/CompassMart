import { IProduct, IProductQuery, IProductResponse } from '../models/interfaces/product-interface';
import ProductSchema from '../models/schemas/product-schema';
import { ObjectId, PaginateResult } from 'mongoose';
import paginateCustomLabels from '../../utils/paginate-custom-labels';
import productRules from '../../utils/product-rules';
import { IPaginate } from '../models/interfaces/paginate-interface';

class ProductRepository {
  async find (query: IProductQuery): Promise<PaginateResult<IProductResponse>> {
    const options = {
      page: query.page || 1,
      limit: query.limit || 50,
      customLabels: paginateCustomLabels
    };
    const resultsPaginate = await ProductSchema.paginate(
      {
        department: { $regex: (query.department !== undefined ? query.department : '') },
        brand: { $regex: (query.brand !== undefined ? query.brand : '') },
        stock_control_enabled: true
      }, options);
    return resultsPaginate;
  }

  async findByLowStock (query: IPaginate): Promise<PaginateResult<IProductResponse>> {
    const options = {
      page: query.page || 1,
      limit: query.limit || 50,
      sort: { qtd_stock: 1 },
      customLabels: paginateCustomLabels
    };
    const resultsPaginate = await ProductSchema.paginate(
      {
        qtd_stock: { $lt: productRules.lowStock },
        stock_control_enabled: true
      }, options);
    return resultsPaginate;
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

  async insertMany (payload: IProduct[]): Promise<void> {
    await ProductSchema.insertMany(payload);
  }

  async update (id: ObjectId, payload: IProduct): Promise<IProductResponse | null> {
    const result = await ProductSchema.findByIdAndUpdate({ _id: id }, payload, { new: true });
    if (result) return result;
    return null;
  }

  async deleteByID (id: ObjectId): Promise<void> {
    await ProductSchema.findByIdAndDelete({ _id: id });
  }
}

export default new ProductRepository();
