import { IProduct, IProductResponse } from '../models/interfaces/product-interface';
import productRepository from '../repositories/product-repository';

class ProductService {
  async createProduct (payload: IProduct): Promise<IProductResponse|null> {
    if (await productRepository.findByBarCode(payload.bar_codes)) throw Error('Error');
    payload.stock_control_enabled = true;
    return await productRepository.create(payload);
  }
}

export default new ProductService();
