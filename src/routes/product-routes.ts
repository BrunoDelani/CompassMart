import { Router } from 'express';
import productController from '../api/controllers/product-controller';

const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .post(`${urlBaseRoute}`, productController.createProduct);

export default router;
