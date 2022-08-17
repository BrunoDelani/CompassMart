import { Router } from 'express';
import productController from '../api/controllers/product-controller';
import createProductValidation from '../api/validations/product/create-product-validation';
import IdProductValidation from '../api/validations/product/id-product-validation';

const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .get(`${urlBaseRoute}`, productController.findProduct)
  .get(`${urlBaseRoute}/low_stock`, productController.findProductLowStock)
  .get(`${urlBaseRoute}/:id`, IdProductValidation, productController.findProductByID)
  .post(`${urlBaseRoute}`, createProductValidation, productController.createProduct)
  .delete(`${urlBaseRoute}/:id`, IdProductValidation, productController.deleteProductByID)
;
export default router;
