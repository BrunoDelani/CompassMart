import { Request, Response } from 'express';
import productService from '../services/product-service';

class ProductController {
  async createProduct (req: Request, res: Response) {
    try {
      const result = await productService.createProduct(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
}

export default new ProductController();
