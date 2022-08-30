import { Request, Response } from 'express';
import UserEmailExists from '../../errors/user/user-email-exists';
import userService from '../services/user-service';
import UsersNotFound from '../../errors/user/users-not-found';
import UserNotFound from '../../errors/user/user-not-found';
import PageNotFound from '../../errors/page-not-found';
import UserIncorrectPassword from '../../errors/user/user-incorrect-password';
const ObjectId = require('mongodb').ObjectId;

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
      const result = await userService.createUser(req.body);
      res.status(201).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof UserEmailExists) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async deleteUser (req: Request, res: Response) {
    try {
      const id = new ObjectId(req.params.id);
      await userService.deleteUser(id);
      res.status(204).json();
    } catch (BadRequest) {
      if (BadRequest instanceof UserNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }

  async authenticateUser (req: Request, res: Response) {
    try {
      const result = await userService.authenticateUser(req.body);
      res.status(200).json(result);
    } catch (BadRequest) {
      if (BadRequest instanceof UserIncorrectPassword) return res.status(BadRequest.statusCode).json({ BadRequest });
      if (BadRequest instanceof UserNotFound) return res.status(BadRequest.statusCode).json({ BadRequest });
      return res.status(500).json(BadRequest);
    }
  }
}

export default new UserController();
