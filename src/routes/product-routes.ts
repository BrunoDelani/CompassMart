import { Router } from 'express';
import productController from '../api/controllers/product-controller';
import createProductValidation from '../api/validations/product/create-product-validation';
import IdProductValidation from '../api/validations/product/id-product-validation';
import patchProductValidation from '../api/validations/product/patch-product-validation';
import putProductValidation from '../api/validations/product/put-product-validation';
import multer from 'multer';

const multerConfig = multer();
const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .get(`${urlBaseRoute}`, productController.findProduct)
  .get(`${urlBaseRoute}/low_stock`, productController.findProductLowStock)
  .get(`${urlBaseRoute}/:id`, IdProductValidation, productController.findProductByID)
  .post(`${urlBaseRoute}`, createProductValidation, productController.createProduct)
  .post(`${urlBaseRoute}/csv`, multerConfig.single('file'), productController.createProductCSV)
  .put(`${urlBaseRoute}/:id`, putProductValidation, productController.updateProduct)
  .patch(`${urlBaseRoute}/:id`, patchProductValidation, productController.updateProduct)
  .delete(`${urlBaseRoute}/:id`, IdProductValidation, productController.deleteProductByID)
;
export default router;
