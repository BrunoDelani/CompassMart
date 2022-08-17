import { Router } from 'express';
import productController from '../api/controllers/product-controller';
import createProductValidation from '../api/validations/product/create-product-validation';
import findByIdProductValidation from '../api/validations/product/findById-product-validation';

const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .get(`${urlBaseRoute}/:id`, findByIdProductValidation, productController.findProductByID)
  .post(`${urlBaseRoute}`, createProductValidation, productController.createProduct);

export default router;
