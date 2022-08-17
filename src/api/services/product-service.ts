import ProductBarcodesExists from '../../errors/product-barcodes-exists';
import ProductNotFound from '../../errors/product-not-found';
import { IProduct, IProductResponse } from '../models/interfaces/product-interface';
import productRepository from '../repositories/product-repository';
import { ObjectId } from 'mongoose';

class ProductService {
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
    console.log(result);
    if (result === null) throw new ProductNotFound();
    await productRepository.deleteByID(id);
  }
}

export default new ProductService();
