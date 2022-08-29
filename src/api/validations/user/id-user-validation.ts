import { Request, Response, NextFunction } from 'express';
import UserIdInvalid from '../../../errors/user/user-id-invalid';
const ObjectId = require('mongoose').Types.ObjectId;

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const isValid = ObjectId.isValid(req.params.id);
    if (!isValid) throw new UserIdInvalid();
    return next();
  } catch (BadRequest) {
    if (BadRequest instanceof UserIdInvalid) return res.status(BadRequest.statusCode).json({ BadRequest });
    return res.status(400).json(BadRequest);
  }
};
