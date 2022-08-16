import { Request, Response } from 'express';

class ProductController {
  async createProduct (req: Request, res: Response) {
    try {
      return res.status(201).json({ Created: true });
    } catch (err) {
      return res.status(500).json({ Error: err });
    }
  }
}

export default new ProductController();
