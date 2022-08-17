import ProductBarcodesExists from '../../errors/product-barcodes-exists';
import ProductNotFound from '../../errors/product-not-found';
import ProductsNotFound from '../../errors/products-not-found';
import { IProduct, IProductQuery, IProductResponse } from '../models/interfaces/product-interface';
import productRepository from '../repositories/product-repository';
import { ObjectId } from 'mongoose';

class ProductService {
  async findProducts (query: IProductQuery): Promise<IProductResponse[]> {
    if (query.page === undefined) query.page = 1;
    if (query.limit === undefined) query.limit = 50;
    const result = await productRepository.find(query);
    if (result === null || result.length < 1) throw new ProductsNotFound();
    return result;
  }

  async findProductByID (id: ObjectId): Promise<IProductResponse> {
    const result = await productRepository.findById(id);
    if (result === null) throw new ProductNotFound();
    return result;
  }

  async createProduct (payload: IProduct): Promise<IProductResponse|null> {
    if (await productRepository.findByBarCode(payload.bar_codes)) throw new ProductBarcodesExists();
    payload.stock_control_enabled = true;
    return await productRepository.create(payload);
  }

  async deleteProductByID (id: ObjectId): Promise<void> {
    const result = await productRepository.findById(id);
    if (result === null) throw new ProductNotFound();
    await productRepository.deleteByID(id);
  }
}

export default new ProductService();
