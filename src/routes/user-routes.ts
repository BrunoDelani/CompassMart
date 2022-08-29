import { Router } from 'express';
import userController from '../api/controllers/user-controller';
import createUserValidation from '../api/validations/user/create-user-validation';

const router = Router();
const urlBaseRoute = '/api/v1';
router
  .post(`${urlBaseRoute}/user`, createUserValidation, userController.createUser);

export default router;
