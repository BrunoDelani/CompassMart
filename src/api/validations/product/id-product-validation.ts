import { Request, Response, NextFunction } from 'express';
import ProductIdInvalid from '../../../errors/product/product-id-invalid';
const ObjectId = require('mongoose').Types.ObjectId;

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValid = ObjectId.isValid(req.params.id);
    if (!isValid) throw new ProductIdInvalid();
    return next();
  } catch (BadRequest) {
    if (BadRequest instanceof ProductIdInvalid) return res.status(BadRequest.statusCode).json({ BadRequest });
    return res.status(400).json(BadRequest);
  }
};
