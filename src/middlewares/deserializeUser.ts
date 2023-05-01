import { Request, Response, NextFunction } from 'express';
import { decode } from '../utils/jwt.utils';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.replace(/^Bearer\s/, '');

  if (!token) return next();

  const { decoded, expired } = decode(token);

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired) {
    return res.status(401).send({ success: false, error: true, message: 'Token has been expired, Please login again!' });
  }

  return next();
};

export default deserializeUser;
