import { Request, Response } from 'express';
import ProductNotFound from '../../errors/product-not-found';
import ProductBarcodesExists from '../../errors/product-barcodes-exists';
import productService from '../services/product-service';
const ObjectId = require('mongodb').ObjectId;

class ProductController {
  async findProduct (req: Request, res: Response) {
    try {
      const products = await productService.findProducts(req.query);
      return res.status(200).json({ products });
    } catch (BadRequest) {
      if (BadRequest instanceof ProductNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async findProductByID (req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      const result = await productService.findProductByID(id);
      return res.status(200).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof ProductNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async createProduct (req: Request, res: Response) {
    try {
      const result = await productService.createProduct(req.body);
      return res.status(201).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof ProductBarcodesExists) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async deleteProductByID (req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      await productService.deleteProductByID(id);
      return res.status(204).send();
    } catch (BadRequest) {
      if (BadRequest instanceof ProductNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }
}

export default new ProductController();
