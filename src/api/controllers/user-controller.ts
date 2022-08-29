import { Request, Response } from 'express';

class UserController {
  async createUser (req: Request, res: Response) {
    try {
      res.status(201).json();
    } catch (BadRequest) {
      return res.status(500).json(BadRequest);
    }
  }
}

export default new UserController();
