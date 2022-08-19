import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ProductRules from '../../../utils/product-rules';
import ProductIdInvalid from '../../../errors/product/product-id-invalid';
const ObjectId = require('mongoose').Types.ObjectId;

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValid = ObjectId.isValid(req.params.id);
    if (!isValid) throw new ProductIdInvalid();

    const ProductValidationSchema = Joi.object({
      title: Joi.string().allow(null).trim(),
      description: Joi.string().allow(null).trim(),
      department: Joi.string().allow(null).trim(),
      brand: Joi.string().allow(null).trim(),
      price: Joi.number().allow(null).min(ProductRules.minPrice).max(ProductRules.maxPrice),
      qtd_stock: Joi.number().allow(null).min(ProductRules.minStock).max(ProductRules.maxStock)
    });
    const { error } = await ProductValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw error.details;
    }
    return next();
  } catch (BadRequest) {
    if (BadRequest instanceof ProductIdInvalid) return res.status(BadRequest.statusCode).json({ BadRequest });
    return res.status(400).json(BadRequest);
  }
};
