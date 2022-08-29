import { Request, Response } from 'express';
import UserEmailExists from '../../errors/user/user-email-exists';
import userService from '../services/user-service';

class UserController {
  async createUser (req: Request, res: Response) {
    try {
      const result = await userService.create(req.body);
      res.status(201).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof UserEmailExists) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }
}

export default new UserController();
