import ProductBarcodesExists from '../../errors/product/product-barcodes-exists';
import PageNotFound from '../../errors/product/product-page-not-found';
import ProductNotFound from '../../errors/product/product-not-found';
import ProductsNotFound from '../../errors/product/products-not-found';
import { IProduct, IProductQuery, IProductResponse, IResultInsertProducts, IVerifyProduct } from '../models/interfaces/product-interface';
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
    payload.qtd_stock <= 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
    return await productRepository.create(payload);
  }

  async createProductsByCSV (csv: String): Promise<IResultInsertProducts> {
    const objectList = csv
      .split('\n')
      .map((row) =>
        row.replace(/"/gi, '').replace(/\r/gi, '').split(',')
      );
    objectList.shift();
    return await this.insertListProductsCSV(objectList);
  }

  async updateProduct (id: ObjectId, payload: IProduct): Promise<IProduct> {
    const findProduct = await productRepository.findById(id);
    if (findProduct === null) throw new ProductNotFound();
    payload.qtd_stock === 0 ? payload.stock_control_enabled = false : payload.stock_control_enabled = true;
    const updateProduct = await productRepository.update(id, payload);
    if (updateProduct === null) throw new ProductNotFound();
    return updateProduct;
  }

  async deleteProductByID (id: ObjectId): Promise<void> {
    const result = await productRepository.findById(id);
    if (result === null) throw new ProductNotFound();
    await productRepository.deleteByID(id);
  }

  async insertListProductsCSV (csvFormated: String[][]): Promise<IResultInsertProducts> {
    const insertProducst: IProduct[] = [];
    const listResult: IResultInsertProducts = {
      success: 0,
      errors: 0
    };

    for await (const element of csvFormated) {
      const newProduct: IProduct = {
        title: element[0] || '',
        description: element[1] || '',
        department: element[2] || '',
        brand: element[3] || '',
        price: Number(element[4]) || 0,
        qtd_stock: Number(element[5]) || 0,
        stock_control_enabled: true,
        bar_codes: element[6] || '',
        created_at: new Date(),
        updated_at: new Date()
      };

      const verify: IVerifyProduct = await this.verifyProductToCreate(newProduct);

      if (verify.verify === true) {
        insertProducst.push(newProduct);
        listResult.success = Number(listResult.success) + 1;
      } else {
        listResult.errors = Number(listResult.errors) + 1;
        listResult.error_details === undefined
          ? listResult.error_details = [{
            title: newProduct.title,
            bar_codes: newProduct.bar_codes,
            errors: verify.messages,
            error: verify.message
          }]
          : listResult.error_details?.push({
            title: newProduct.title,
            bar_codes: newProduct.bar_codes,
            errors: verify.messages,
            error: verify.message
          });
      }
    };
    await productRepository.insertMany(insertProducst);
    return listResult;
  }

  async verifyProductToCreate (newProduct: IProduct): Promise<IVerifyProduct> {
    const verificador: IVerifyProduct = {
      verify: true
    };
    if (newProduct.title === '') {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Title is invalid.']
        : verificador.messages.push('Title is invalid.');
    }

    if (newProduct.description === '') {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Description is invalid.']
        : verificador.messages.push('Description is invalid.');
    }

    if (newProduct.department === '') {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Department is invalid.']
        : verificador.messages.push('Department is invalid.');
    }

    if (newProduct.brand === '') {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Brand is invalid.']
        : verificador.messages.push('Brand is invalid.');
    }

    if (newProduct.qtd_stock > 100000 || newProduct.qtd_stock < 1) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = [`Stock ${newProduct.qtd_stock} is invalid.`]
        : verificador.messages.push(`Stock ${newProduct.qtd_stock} is invalid.`);
    }

    if (newProduct.price < 0.01 || newProduct.price > 1000) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = [`Price ${newProduct.price} is invalid.`]
        : verificador.messages.push(`Price ${newProduct.price} is invalid.`);
    }
    if (newProduct.bar_codes.length !== 13 || (isNaN(Number(newProduct.bar_codes)))) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = [`bar_codes ${newProduct.bar_codes} is invalid.`]
        : verificador.messages.push(`bar_codes ${newProduct.bar_codes} is invalid.`);
    }

    if (await productRepository.findByBarCode(newProduct.bar_codes)) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = [`bar_codes ${newProduct.bar_codes} is duplicated`]
        : verificador.messages.push(`bar_codes ${newProduct.bar_codes} is duplicated`);
    }
    if (verificador.messages && verificador.messages.length < 2) {
      verificador.message = verificador.messages[0];
      delete verificador.messages;
    }
    return verificador;
  }
}

export default new ProductService();
