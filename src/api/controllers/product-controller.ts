import { Request, Response } from 'express';
import ProductBarcodesExists from '../../errors/product-barcodes-exists';
import productService from '../services/product-service';

class ProductController {
  async createProduct (req: Request, res: Response) {
    try {
      const result = await productService.createProduct(req.body);
      return res.status(201).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof ProductBarcodesExists) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }
}

export default new ProductController();
