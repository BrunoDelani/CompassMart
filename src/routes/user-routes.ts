import { Router } from 'express';

const router = Router();
const urlBaseRoute = '/api/v1';
router
  .post(`${urlBaseRoute}/user`, (req, res) => {
    res.status(200).send();
  });

export default router;
