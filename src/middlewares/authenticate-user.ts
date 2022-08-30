import { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ error: 'No token provied.' });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).send({ error: 'Token invalid.' });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted.' });
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(401).send({ error: 'Token invalid verify.' });
    return next();
  });
};
