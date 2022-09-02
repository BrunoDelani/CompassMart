import ProductBarcodesExists from '../../errors/product/product-barcodes-exists';
import PageNotFound from '../../errors/page-not-found';
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
        row.replace(/("[^"]*")/g, (x) => {
          return x.replace(/,/g, '.');
        }).replace(/"/gi, '').replace(/\r/gi, '').split(',')
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

  async mapperProduct (id: ObjectId): Promise<any> {
    const result: any = await productRepository.findById(id);
    if (result === null) throw new ProductNotFound();
    const mapper = require('../mapper/mapper.json').fields;
    let newProductFromatter: any = {};
    let valueField: any = {};
    const insertValues = (mMap: string[], pMap: string[], type: string, optional: Array<string | number>, newProductFromatter: any) => {
      // eslint-disable-next-line no-unreachable-loop
      for (let index = 0; index <= (mMap.length - 1); index++) {
        for (const key in newProductFromatter) {
          if (typeof newProductFromatter[key] === 'object') {
            if (mMap[index] === key) {
              mMap.shift();
              newProductFromatter[key] = {
                ...newProductFromatter[key],
                ...insertValues(mMap, pMap, type, optional, newProductFromatter[key])
              };
              return newProductFromatter;
            }
          } else if (mMap[index] === key) {
            mMap.shift();
            newProductFromatter[key] = { ...newProductFromatter[key], ...insertValues(mMap, pMap, type, optional, newProductFromatter) };
            return newProductFromatter;
          };
        }
        if (mMap[index] !== mMap[mMap.length - 1]) {
          const field = mMap[index];
          mMap.shift();
          valueField = { [field]: insertValues(mMap, pMap, type, optional, newProductFromatter) };
          return valueField;
        } else {
          valueField = { [mMap[index]]: this.formatterValue(result[pMap.toString()], type, optional) };
          return valueField;
        }
      };
    };
    for (const key in mapper) {
      const mMap: string[] = mapper[key].fieldMarket.split('.');
      const pMap: string[] = mapper[key].fieldProduct.split('.');
      const type: string = mapper[key].type;
      const optional: Array<string | number> = mapper[key].optional;
      pMap.shift();
      valueField = {};
      newProductFromatter = { ...newProductFromatter, ...insertValues(mMap, pMap, type, optional, newProductFromatter) };
    };
    return newProductFromatter;
  }

  formatterValue (value: any, type: string, optional: Array<any>): any {
    if (optional !== undefined) {
      if (optional[0] === 'currency') {
        const newValue = new Intl.NumberFormat(
          optional[1], {
            style: 'currency',
            currency: optional[2]
          }).format(value);
        return newValue;
      }
      if (optional[0] === 'break') {
        const newValue: Array<String> = [];
        for (let index = 0; index < value.length; index += 2) {
          index + 1 < value.length
            ? newValue.push(value[index] + value[index + 1])
            : newValue.push(value[index]);
        }
        return newValue;
      };
    } else {
      switch (type) {
      case 'text':
        return value.toString();
      case 'array':
        return [value];
      case 'boolean':
        if (value === true || value === 1) {
          return true;
        } else {
          return false;
        }
      case 'number':
        return Number(value);
      }
    }
    return undefined;
  }

  async insertListProductsCSV (csvFormated: String[][]): Promise<IResultInsertProducts> {
    const insertProducts: IProduct[] = [];
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
        insertProducts.push(newProduct);
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
    await productRepository.insertMany(insertProducts);
    return listResult;
  }

  async verifyProductToCreate (newProduct: IProduct): Promise<IVerifyProduct> {
    const verificador: IVerifyProduct = {
      verify: true
    };
    if (['undefined', 'null', ''].includes(newProduct.title.toString())) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Title is null.']
        : verificador.messages.push('Title is null.');
    }

    if (['undefined', 'null', ''].includes(newProduct.description.toString())) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Description is null.']
        : verificador.messages.push('Description is null.');
    }

    if (['undefined', 'null', ''].includes(newProduct.department.toString())) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Department is null.']
        : verificador.messages.push('Department is null.');
    }

    if (['undefined', 'null', ''].includes(newProduct.brand.toString())) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Brand is null.']
        : verificador.messages.push('Brand is null.');
    }

    if (['undefined', 'null', ''].includes(newProduct.qtd_stock.toString())) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Stock is null.']
        : verificador.messages.push('Stock is null.');
    } else if (newProduct.qtd_stock > 100000 || newProduct.qtd_stock < 1) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = [`Stock is ${newProduct.qtd_stock}.`]
        : verificador.messages.push(`Stock is ${newProduct.qtd_stock}.`);
    }

    if (['undefined', 'null', ''].includes(newProduct.price.toString())) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['Price is null.']
        : verificador.messages.push('Price is null.');
    } else if (newProduct.price < 0.01 || newProduct.price > 1000) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = [`Price is ${newProduct.price}.`]
        : verificador.messages.push(`Price is ${newProduct.price}.`);
    }

    if (newProduct.bar_codes.length !== 13) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['bar_codes hasn\'t 13 digit.']
        : verificador.messages.push('bar_codes hasn\'t 13 digit.');
    } else if ((isNaN(Number(newProduct.bar_codes)))) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['bar_codes is not a number.']
        : verificador.messages.push('bar_codes is not a number.');
    }

    if (await productRepository.findByBarCode(newProduct.bar_codes)) {
      verificador.verify = false;
      verificador.messages === undefined
        ? verificador.messages = ['bar_codes duplicate']
        : verificador.messages.push('bar_codes duplicate');
    }
    if (verificador.messages && verificador.messages.length < 2) {
      verificador.message = verificador.messages[0];
      delete verificador.messages;
    }
    return verificador;
  }
}

export default new ProductService();
