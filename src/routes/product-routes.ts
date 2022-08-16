import { Router } from 'express';

const router = Router();
const urlBaseRoute = '/api/v1/product';
router
  .post(`${urlBaseRoute}`);

export default router;
