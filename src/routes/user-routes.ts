import { Router } from 'express';
import userController from '../api/controllers/user-controller';

const router = Router();
const urlBaseRoute = '/api/v1';
router
  .post(`${urlBaseRoute}/user`, userController.createUser);

export default router;
