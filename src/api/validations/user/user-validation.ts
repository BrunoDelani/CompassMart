import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const UserValidationSchema = Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().required()
    });
    const { error } = await UserValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
      throw error.details;
    }
    return next();
  } catch (BadRequest) {
    return res.status(400).json(BadRequest);
  }
};
