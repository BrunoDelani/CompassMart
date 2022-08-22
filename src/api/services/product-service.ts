import ProductBarcodesExists from '../../errors/product/product-barcodes-exists';
import PageNotFound from '../../errors/product/product-page-not-found';
import ProductNotFound from '../../errors/product/product-not-found';
import ProductsNotFound from '../../errors/product/products-not-found';
import { IProduct, IProductPatch, IProductQuery, IProductResponse } from '../models/interfaces/product-interface';
import productRepository from '../repositories/product-repository';
import { ObjectId, PaginateResult } from 'mongoose';
import { IPaginate } from '../models/interfaces/paginate-interface';

class ProductService {
  async findProducts (query: IPaginate): Promise<PaginateResult<IProductResponse>> {
    const results = await productRepository.find(query);
    if ((query.page && results.offsets) && (query.page > results.offsets)) throw new PageNotFound();
    if (query.page && query.page <= 0) throw new PageNotFound();
    if (query.limit && query.limit <= 0) throw new PageNotFound();
    if (!results.total) throw new ProductsNotFound();
    return results;
  }

  async findProductsLowStock (query: IProductQuery): Promise<PaginateResult<IProductResponse>> {
    const results = await productRepository.findByLowStock(query);
    if ((query.page && results.offsets) && (query.page > results.offsets)) throw new PageNotFound();
    if (query.page && query.page <= 0) throw new PageNotFound();
    if (query.limit && query.limit <= 0) throw new PageNotFound();
    if (!results.total) throw new ProductsNotFound();
    return results;
  }

  async findProductByID (id: ObjectId): Promise<IProductResponse> {
    const result = await productRepository.findById(id);
    if (result === null) throw new ProductNotFound();
    return result;
  }

  async createProduct (payload: IProduct): Promise<IProductResponse | null> {
    if (await productRepository.findByBarCode(payload.bar_codes)) throw new ProductBarcodesExists();
    payload.qtd_stock <= 0 ? payload.stock_control_enabled = true : payload.stock_control_enabled = false;
    return await productRepository.create(payload);
  }

  createProductsCSV (csv : String) {
    const objectList = csv
      .split('\n')
      .map((row) =>
        row.replace(/"/gi, '').split(',')
      );

    objectList.shift();
    objectList.forEach(element => {
      console.log(element);
    });
  }

  async updateProduct (id: ObjectId, payload: IProduct): Promise<void> {
    const findProduct = await productRepository.findById(id);
    if (findProduct === null) throw new ProductNotFound();
    payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
    const updateProduct = await productRepository.update(id, payload);
    if (updateProduct === null) throw new ProductNotFound();
  }

  async updatePartialProduct (id: ObjectId, payload: IProductPatch): Promise<void> {
    const findProduct = await productRepository.findById(id);
    if (findProduct === null) throw new ProductNotFound();
    const formatedProduct = this.deleteFieldsNullOrUndefined(payload);
    formatedProduct.qtd_stock === 0 ? formatedProduct.stock_control_enabled = false : formatedProduct.stock_control_enabled = true;
    const updateProduct = await productRepository.update(id, formatedProduct);
    if (updateProduct === null) throw new ProductNotFound();
  }

  async deleteProductByID (id: ObjectId): Promise<void> {
    const result = await productRepository.findById(id);
    if (result === null) throw new ProductNotFound();
    await productRepository.deleteByID(id);
  }

  deleteFieldsNullOrUndefined (payload : any): IProductPatch {
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        if (payload[key] === undefined || payload[key] === null) {
          delete payload[key];
        }
      }
    }
    return payload;
  };
}

export default new ProductService();
