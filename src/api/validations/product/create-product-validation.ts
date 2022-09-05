import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import ProductRules from '../../../utils/product-rules';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ProductValidationSchema = Joi.object({
      title: Joi.string().trim().required(),
      description: Joi.string().trim().required(),
      department: Joi.string().trim().required(),
      brand: Joi.string().trim().required(),
      price: Joi.number().min(ProductRules.minPrice).max(ProductRules.maxPrice).required(),
      qtd_stock: Joi.number().min(ProductRules.minStockToRegister).max(ProductRules.maxStock).required(),
      bar_codes: Joi.string().trim().length(ProductRules.barCodesLength).required()
    });
    const { error } = await ProductValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        message: 'Bad Request',
        details: error.details.map((detail) => ({
          name: detail.path.join('.'),
          description: detail.message
        })
        )
      }
      );
    }
    return next();
  } catch (BadRequest) {
    return res.status(400).json(BadRequest);
  }
};
