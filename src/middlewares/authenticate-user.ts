import { NextFunction, Request, Response } from 'express';
import NoToken from '../errors/authenticate/token-no-provided';
import tokenInvalid from '../errors/authenticate/token-invalid';
import tokenMalformatted from '../errors/authenticate/token-malformatted';
const jwt = require('jsonwebtoken');

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send({ BadRequest: NoToken });
  const parts = authHeader.split(' ');
  if (parts.length !== 2) return res.status(401).send({ BadRequest: tokenInvalid });
  const [scheme, token] = parts;
  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ BadRequest: tokenMalformatted });
  jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
    if (err) return res.status(401).send({ BadRequest: tokenInvalid });
    return next();
  });
};
