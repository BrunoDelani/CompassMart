import { Router } from 'express';
import userController from '../api/controllers/user-controller';
import createUserValidation from '../api/validations/user/create-user-validation';

const router = Router();
const urlBaseRoute = '/api/v1';
router
  .get(`${urlBaseRoute}/user`, userController.findUser)
  .post(`${urlBaseRoute}/user`, createUserValidation, userController.createUser)
  .delete(`${urlBaseRoute}/user`, () => {
    console.log('Delete route');
  });

export default router;
