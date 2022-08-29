import { Request, Response } from 'express';
import UserEmailExists from '../../errors/user/user-email-exists';
import userService from '../services/user-service';
import UsersNotFound from '../../errors/user/users-not-found';
import PageNotFound from '../../errors/page-not-found';

class UserController {
  async findUser (req: Request, res: Response) {
    try {
      const users = await userService.findUser(req.query);
      res.status(200).json(users);
    } catch (BadRequest) {
      if (BadRequest instanceof PageNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      if (BadRequest instanceof UsersNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async createUser (req: Request, res: Response) {
    try {
      const result = await userService.create(req.body);
      res.status(201).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof UserEmailExists) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async deleteUser (req: Request, res: Response) {
    try {
      res.status(204).json();
    } catch (BadRequest) {
      return res.status(500).json(BadRequest);
    }
  }
}

export default new UserController();
