import { Router } from 'express';
import userController from '../api/controllers/user-controller';
import userValidation from '../api/validations/user/user-validation';
import idUserValidation from '../api/validations/user/id-user-validation';
import authMiddleware from '../middlewares/authenticate-user';

const router = Router();
const urlBaseRoute = '/api/v1';
router
  .get(`${urlBaseRoute}/user`, authMiddleware, userController.findUser)
  .post(`${urlBaseRoute}/user`, userValidation, userController.createUser)
  .post(`${urlBaseRoute}/authenticate`, userValidation, userController.authenticateUser)
  .delete(`${urlBaseRoute}/user/:id`, authMiddleware, idUserValidation, userController.deleteUser)
;

export default router;
