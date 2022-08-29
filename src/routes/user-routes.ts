import { Router } from 'express';
import userController from '../api/controllers/user-controller';
import createUserValidation from '../api/validations/user/create-user-validation';
import idUserValidation from '../api/validations/user/id-user-validation';

const router = Router();
const urlBaseRoute = '/api/v1';
router
  .get(`${urlBaseRoute}/user`, userController.findUser)
  .post(`${urlBaseRoute}/user`, createUserValidation, userController.createUser)
  .post(`${urlBaseRoute}/authenticate`, () => {
    console.log('Route authenticate ok');
  })
  .delete(`${urlBaseRoute}/user/:id`, idUserValidation, userController.deleteUser)
;

export default router;
