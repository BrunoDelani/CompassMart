import { Request, Response } from 'express';
import userService from '../services/user-service';

class UserController {
  async createUser (req: Request, res: Response) {
    try {
      const result = await userService.create(req.body);
      res.status(201).json(result);
    } catch (BadRequest) {
      return res.status(500).json(BadRequest);
    }
  }
}

export default new UserController();
