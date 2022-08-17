import { Router } from 'express';
import productController from '../api/controllers/product-controller';
import createProductValidation from '../api/validations/product/create-product-validation';

const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .get(`${urlBaseRoute}/:id`, productController.findProductByID)
  .post(`${urlBaseRoute}`, createProductValidation, productController.createProduct);

export default router;
