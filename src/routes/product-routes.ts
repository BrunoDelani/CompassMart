import { Router } from 'express';
import productController from '../api/controllers/product-controller';
import createProductValidation from '../api/validations/product/create-product-validation';
import IdProductValidation from '../api/validations/product/id-product-validation';
import patchProductValidation from '../api/validations/product/patch-product-validation';
import putProductValidation from '../api/validations/product/put-product-validation';
import multer from 'multer';
import authMiddleware from '../middlewares/authenticate-user';

const multerConfig = multer();
const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .get(`${urlBaseRoute}`, authMiddleware, productController.findProduct)
  .post(`${urlBaseRoute}`, authMiddleware, createProductValidation, productController.createProduct)
  .post(`${urlBaseRoute}/csv`, authMiddleware, multerConfig.single('file'), productController.createProductCSV)
  .get(`${urlBaseRoute}/low_stock`, authMiddleware, productController.findProductLowStock)
  .get(`${urlBaseRoute}/marketplace/:id`, authMiddleware, IdProductValidation, productController.mapperProductByID)
  .get(`${urlBaseRoute}/:id`, authMiddleware, IdProductValidation, productController.findProductByID)
  .put(`${urlBaseRoute}/:id`, authMiddleware, putProductValidation, productController.updateProduct)
  .patch(`${urlBaseRoute}/:id`, authMiddleware, patchProductValidation, productController.updateProduct)
  .delete(`${urlBaseRoute}/:id`, authMiddleware, IdProductValidation, productController.deleteProductByID)
;
export default router;
